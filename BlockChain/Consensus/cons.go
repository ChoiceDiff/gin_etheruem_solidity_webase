package Consensus

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

var UserReputation map[string]int //user->reputation
var Roles [7]string
var utxo UTXO
var Products []Product

var txSupplier []chan Transaction
var txBusiness []chan Transaction
var txRetail []chan Transaction
var txClient []chan Transaction
var txPay []chan Transaction
var txFactor []chan Transaction
var txExpress []chan Transaction

var blockSupplier []chan Block
var blockBusiness []chan Block
var blockRetail []chan Block
var blockClient []chan Block
var blockPay []chan Block
var blockFactor []chan Block
var blockExpress []chan Block

func ConCmd() {
	UserReputation = make(map[string]int)
	Roles = [7]string{"Supplier", "Business", "Retail", "Client", "Pay", "Factor", "Express"}
	rand.Seed(time.Now().UnixNano()) //设置随机数种子
	for i := 0; i < 10; i++ {
		price := 1 + 15*rand.Float64()
		Products = append(Products, Product{
			id:    uint(i),
			price: price,
		})
	} //添加十件商品
	for i := 0; i < 5; i++ {
		name := "Supplier"
		UserReputation[name] = 500
		txSupplier = append(txSupplier, make(chan Transaction))
		blockSupplier = append(blockSupplier, make(chan Block))
		go Supplier(i, name)
	} //5  Suppliers

	for i := 0; i < 15; i++ {
		name := "Business" + strconv.Itoa(i)
		UserReputation[name] = 500
		txBusiness = append(txBusiness, make(chan Transaction))
		blockBusiness = append(blockBusiness, make(chan Block))
		go Business(i)
	} //15 Businesses

	for i := 0; i < 5; i++ {
		name := "Retail" + strconv.Itoa(i)
		UserReputation[name] = 500
		txRetail = append(txRetail, make(chan Transaction))
		blockRetail = append(blockRetail, make(chan Block))
		go Retail(i)
	} //5  Retails

	for i := 0; i < 10; i++ {
		name := "Client" + strconv.Itoa(i)
		UserReputation[name] = 100
		txClient = append(txClient, make(chan Transaction))
		blockClient = append(blockClient, make(chan Block))
		go Client(i)
	} //10 Clients

	for i := 0; i < 2; i++ {
		name := "Pay" + strconv.Itoa(i)
		UserReputation[name] = 100
		txPay = append(txPay, make(chan Transaction))
		blockPay = append(blockPay, make(chan Block))
		go Pay(i)
	} //2  Pays
	for i := 0; i < 2; i++ {
		name := "Express" + strconv.Itoa(i)
		UserReputation[name] = 100
		txExpress = append(txExpress, make(chan Transaction))
		blockExpress = append(blockExpress, make(chan Block))
		go Express(i)
	} //2  Expresses
	for i := 0; i < 2; i++ {
		name := "Factor" + strconv.Itoa(i)
		UserReputation[name] = 100
		txFactor = append(txFactor, make(chan Transaction))
		blockFactor = append(blockFactor, make(chan Block))
		go Factor(i)
	} //2  Factors
	select {}
}

func Supplier(routineIdOrTxSender int, kind string) {
	sender := kind + strconv.Itoa(routineIdOrTxSender)
	fmt.Println("Start " + sender + "Reputation:" + strconv.Itoa(UserReputation[sender]))
	rand.Seed(time.Now().UnixNano())
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(2 * time.Second)
	for _ = range ticker.C {
		receiver := ChooseReceiverRand(kind)
		CreateTx(sender, receiver)
		fmt.Println("TX: Sender:", sender, " Receiver:",
			receiver, " ProductId:", productId, " Num:", num, " Price:", price)
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
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Factor!!!")
	}
}

func ChooseReceiverRand() string {

}

func CreateTx(sender string, receiver string) {
	sender := "Supplier" + strconv.Itoa(routineIdOrTxSender)
	receiver := "Supplier" + strconv.Itoa(rand.Intn(5))
	productId := rand.Intn(10) //随机选择一件商品
	num := 1 + rand.Intn(15)   //随机选择数量
	price := Products[productId].price * float64(num)
	//newTx := &Transaction{
	//	Sender:    sender,
	//	Receiver:  receiver,
	//	ProductId: uint(productId),
	//	Num:       uint(num),
	//	Price:     price,
	//}
}
