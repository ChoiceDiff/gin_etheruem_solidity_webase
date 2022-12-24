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
var txBusiness map[string]chan Transaction
var txRetail map[string]chan Transaction
var txClient map[string]chan Transaction
var txPay map[string]chan Transaction
var txFactor map[string]chan Transaction
var txExpress map[string]chan Transaction

var blockSupplier map[string]chan Block
var blockBusiness map[string]chan Block
var blockRetail map[string]chan Block
var blockClient map[string]chan Block
var blockPay map[string]chan Block
var blockFactor map[string]chan Block
var blockExpress map[string]chan Block

func ConCmd() {
	UserReputation = make(map[string]int)
	UserNum = make(map[string]int) //访问map需要初始化
	txSupplier = make(map[string]chan Transaction)
	txBusiness = make(map[string]chan Transaction)
	txRetail = make(map[string]chan Transaction)
	txClient = make(map[string]chan Transaction)
	txPay = make(map[string]chan Transaction)
	txFactor = make(map[string]chan Transaction)
	txExpress = make(map[string]chan Transaction)

	blockSupplier = make(map[string]chan Block)
	blockBusiness = make(map[string]chan Block)
	blockRetail = make(map[string]chan Block)
	blockClient = make(map[string]chan Block)
	blockPay = make(map[string]chan Block)
	blockFactor = make(map[string]chan Block)
	blockExpress = make(map[string]chan Block)

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
		name := kind + strconv.Itoa(i)
		SupplierAccount = append(SupplierAccount, name) //加入用户
		UserReputation[name] = 500
		txSupplier[name] = make(chan Transaction, 10) //加入专属交易管道
		blockSupplier[name] = make(chan Block, 5)     //加入专属区块管道
		go ConsistencyProcess(i, kind)                //编号，类别
	} //5  Suppliers

	for i := 0; i < 15; i++ {
		kind := "Business"
		name := kind + strconv.Itoa(i)
		UserReputation[name] = 500
		txBusiness[name] = make(chan Transaction, 10) //加入专属交易管道
		blockBusiness[name] = make(chan Block, 5)     //加入专属区块管道
		go ConsistencyProcess(i, kind)
	} //15 Businesses

	for i := 0; i < 5; i++ {
		kind := "Retail"
		name := kind + strconv.Itoa(i)
		UserReputation[name] = 500
		txRetail[name] = make(chan Transaction, 10) //加入专属交易管道
		blockRetail[name] = make(chan Block, 5)     //加入专属区块管道
		go ConsistencyProcess(i, kind)
	} //5  Retails

	for i := 0; i < 10; i++ {
		kind := "Client"
		name := kind + strconv.Itoa(i)
		UserReputation[name] = 100
		txClient[name] = make(chan Transaction, 10) //加入专属交易管道
		blockClient[name] = make(chan Block, 5)     //加入专属区块管道
		go ConsistencyProcess(i, kind)
	} //10 Clients

	for i := 0; i < 2; i++ {
		kind := "Pay"
		name := kind + strconv.Itoa(i)
		UserReputation[name] = 100
		txPay[name] = make(chan Transaction, 10) //加入专属交易管道
		blockPay[name] = make(chan Block, 5)     //加入专属区块管道
		go ConsistencyProcess(i, kind)
	} //2  Pays
	for i := 0; i < 2; i++ {
		kind := "Express"
		name := kind + strconv.Itoa(i)
		UserReputation[name] = 100
		txExpress[name] = make(chan Transaction, 10) //加入专属交易管道
		blockExpress[name] = make(chan Block, 5)     //加入专属区块管道
		go ConsistencyProcess(i, kind)
	} //2  Expresses
	for i := 0; i < 2; i++ {
		kind := "Factor"
		name := kind + strconv.Itoa(i)
		UserReputation[name] = 100
		txFactor[name] = make(chan Transaction, 10) //加入专属交易管道
		blockFactor[name] = make(chan Block, 5)     //加入专属区块管道
		go ConsistencyProcess(i, kind)
	} //2  Factors
	select {}
}

func ConsistencyProcess(routineIdOrTxSender int, kind string) {
	user := kind + strconv.Itoa(routineIdOrTxSender)
	fmt.Println("Start " + user + " Reputation: " + strconv.Itoa(UserReputation[user]))
	go ReceivedTx(user)
	//ticker := time.NewTicker(2 * time.Second)
	for { //
		rand.Seed(time.Now().UnixNano())
		//timeRand := rand.Intn(5)
		time.Sleep(time.Second)
		newTx := ChooseReceiverRandomlyAndCreateTx(routineIdOrTxSender, kind)
		fmt.Println(newTx)
		///??????????
		for i := 0; i < 5; i++ {
			if i != routineIdOrTxSender {
				txSupplier[kind+strconv.Itoa(i)] <- newTx
			}
		} //全部广播!!!
	}
}

func ChooseReceiverRandomlyAndCreateTx(uid int, kind string) Transaction {
	receiverId := uid
	receiverKind := kind
	for receiverKind == kind && receiverId == uid {
		rand.Seed(time.Now().UnixNano())
		randomKindId := rand.Intn(7)                          //
		receiverKind = Roles[randomKindId]                    //随机挑一类
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
