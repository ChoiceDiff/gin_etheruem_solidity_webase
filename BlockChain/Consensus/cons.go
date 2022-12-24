package Consensus

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

var UserReputation map[string]int //user->reputation
var Roles [7]string
var UserNum map[string]int
var SupplierAccount []string

var utxo UTXO
var Products []Product

var txSupplier map[string]chan Transaction
var txBusiness []chan Transaction
var txRetail []chan Transaction
var txClient []chan Transaction
var txPay []chan Transaction
var txFactor []chan Transaction
var txExpress []chan Transaction

var blockSupplier map[string]chan Block
var blockBusiness []chan Block
var blockRetail []chan Block
var blockClient []chan Block
var blockPay []chan Block
var blockFactor []chan Block
var blockExpress []chan Block

func ConCmd() {
	UserReputation = make(map[string]int)
	UserNum = make(map[string]int) //访问map需要初始化
	txSupplier = make(map[string]chan Transaction)
	blockSupplier = make(map[string]chan Block)
	Roles = [7]string{"Supplier", "Business", "Retail", "Client", "Pay", "Factor", "Express"}
	UserNum["Supplier"] = 5
	UserNum["Business"] = 15
	UserNum["Retail"] = 5
	UserNum["Client"] = 10
	UserNum["Pay"] = 2
	UserNum["Factor"] = 2
	UserNum["Express"] = 2

	rand.Seed(time.Now().UnixNano()) //设置随机数种子
	for i := 0; i < 10; i++ {
		price := 1 + 15*rand.Float64() //随机价格
		Products = append(Products, Product{
			id:    uint(i),
			price: price,
		})
	} //添加十件商品

	for i := 0; i < 5; i++ {
		kind := "Supplier"
		name := "Supplier" + strconv.Itoa(i)
		SupplierAccount = append(SupplierAccount, name) //加入用户
		UserReputation[name] = 500
		txSupplier[name] = make(chan Transaction, 10) //加入专属交易管道
		blockSupplier[name] = make(chan Block, 5)     //加入专属区块管道
		go Supplier(i, kind)                          //编号，类别
	} //5  Suppliers

	//for i := 0; i < 15; i++ {
	//	name := "Business" + strconv.Itoa(i)
	//	UserReputation[name] = 500
	//	txBusiness = append(txBusiness, make(chan Transaction))
	//	blockBusiness = append(blockBusiness, make(chan Block))
	//	go Business(i)
	//} //15 Businesses
	//
	//for i := 0; i < 5; i++ {
	//	name := "Retail" + strconv.Itoa(i)
	//	UserReputation[name] = 500
	//	txRetail = append(txRetail, make(chan Transaction))
	//	blockRetail = append(blockRetail, make(chan Block))
	//	go Retail(i)
	//} //5  Retails
	//
	//for i := 0; i < 10; i++ {
	//	name := "Client" + strconv.Itoa(i)
	//	UserReputation[name] = 100
	//	txClient = append(txClient, make(chan Transaction))
	//	blockClient = append(blockClient, make(chan Block))
	//	go Client(i)
	//} //10 Clients
	//
	//for i := 0; i < 2; i++ {
	//	name := "Pay" + strconv.Itoa(i)
	//	UserReputation[name] = 100
	//	txPay = append(txPay, make(chan Transaction))
	//	blockPay = append(blockPay, make(chan Block))
	//	go Pay(i)
	//} //2  Pays
	//for i := 0; i < 2; i++ {
	//	name := "Express" + strconv.Itoa(i)
	//	UserReputation[name] = 100
	//	txExpress = append(txExpress, make(chan Transaction))
	//	blockExpress = append(blockExpress, make(chan Block))
	//	go Express(i)
	//} //2  Expresses
	//for i := 0; i < 2; i++ {
	//	name := "Factor" + strconv.Itoa(i)
	//	UserReputation[name] = 100
	//	txFactor = append(txFactor, make(chan Transaction))
	//	blockFactor = append(blockFactor, make(chan Block))
	//	go Factor(i)
	//} //2  Factors
	select {}
}

func Supplier(routineIdOrTxSender int, kind string) {
	user := kind + strconv.Itoa(routineIdOrTxSender)
	fmt.Println("Start " + user + " Reputation: " + strconv.Itoa(UserReputation[user]))
	go ReceivedTx(user)
	ticker := time.NewTicker(2 * time.Second)
	for _ = range ticker.C {
		newTx := ChooseReceiverRandAndCreateTx(routineIdOrTxSender, kind)
		fmt.Println(newTx)
		for i := 0; i < 5; i++ {
			if i != routineIdOrTxSender {
				txSupplier[kind+strconv.Itoa(i)] <- newTx
			}
		} //全部广播
	}
}

func ChooseReceiverRandAndCreateTx(uid int, kind string) Transaction {
	receiverId := uid
	receiverKind := kind
	for receiverKind == kind && receiverId == uid {
		rand.Seed(time.Now().UnixNano())
		//randomKindId := rand.Intn(7)                  //
		receiverKind = Roles[0]                               //随机挑一类
		receiverId = rand.Intn(10000) % UserNum[receiverKind] //每一类的人数不一样
		// panic: invalid argument to Intn

	} //随机选一个非自己的用户做交易
	rand.Seed(time.Now().UnixNano())
	sender := kind + strconv.Itoa(uid)
	receiver := receiverKind + strconv.Itoa(receiverId)
	productId := rand.Intn(1000) % 10 //随机选择一件商品
	num := 1 + rand.Intn(10000)%15    //随机选择数量
	price := Products[productId].price * float64(num)
	return Transaction{
		Sender:    sender,
		Receiver:  receiver,
		ProductId: uint(productId),
		Num:       uint(num),
		Price:     price,
	}
}

func ReceivedTx(userName string) {
	fmt.Println("!!!!!!!!!", userName, "Start Receiving TX!!! ")
	for {
		newestTx := <-txSupplier[userName]
		fmt.Println(userName, " Received TX!!! ", newestTx)
	}
}
func Business(routineId int) {
	fmt.Println("Start Business" + strconv.Itoa(routineId))
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(2 * time.Second)
	for _ = range ticker.C {
		fmt.Println("Business!!!")
	}
}

func Retail(routineId int) {
	fmt.Println("Start Supplier" + strconv.Itoa(routineId))
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Retail!!!")
	}
}

func Client(routineId int) {
	fmt.Println("Start Client" + strconv.Itoa(routineId))
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Client!!!")
	}
}

func Pay(routineId int) {
	fmt.Println("Start Pay" + strconv.Itoa(routineId))
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Pay!!!")
	}
}

func Express(routineId int) {
	fmt.Println("Start Express" + strconv.Itoa(routineId))
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Express!!!")
	}
}

func Factor(routineId int) {
	fmt.Println("Start Factor" + strconv.Itoa(routineId))
	time.Sleep(2 * time.Millisecond)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Factor!!!")
	}
}
