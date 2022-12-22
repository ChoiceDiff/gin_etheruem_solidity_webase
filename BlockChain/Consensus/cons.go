package Consensus

import (
	"fmt"
	"time"
)

var Users []

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
	for i := 0; i < 5; i++ {
		txSupplier = append(txSupplier, make(chan Transaction))
		blockSupplier = append(blockSupplier, make(chan Block))
		go Supplier(i)
	} //5  Suppliers

	for i := 0; i < 15; i++ {
		txBusiness = append(txBusiness, make(chan Transaction))
		blockBusiness = append(blockBusiness, make(chan Block))
		go Business(i)
	} //15 Businesses

	for i := 0; i < 5; i++ {
		txRetail = append(txRetail, make(chan Transaction))
		blockRetail = append(blockRetail, make(chan Block))
		go Retail(i)
	} //5  Retails

	for i := 0; i < 10; i++ {
		txClient = append(txClient, make(chan Transaction))
		blockClient = append(blockClient, make(chan Block))
		go Client(i)
	} //10 Clients

	for i := 0; i < 2; i++ {
		txPay = append(txPay, make(chan Transaction))
		blockPay = append(blockPay, make(chan Block))
		go Pay(i)
	} //2  Pays
	for i := 0; i < 2; i++ {
		txExpress = append(txExpress, make(chan Transaction))
		blockExpress = append(blockExpress, make(chan Block))
		go Express(i)
	} //2  Expresses
	for i := 0; i < 2; i++ {
		txFactor = append(txFactor, make(chan Transaction))
		blockFactor = append(blockFactor, make(chan Block))
		go Factor(i)
	} //2  Factors
	select {}
}

func Supplier(goId int) {
	routineId := goId
	fmt.Println("Start Supplier!!!")
	<-txSupplier[routineId]
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Supplier!!!")
	}
}

func Business(goId int) {
	routineId := goId
	fmt.Println("Start Business!!!")
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Business!!!")
	}
}

func Retail(goId int) {
	routineId := goId
	fmt.Println("Start Retail!!!")
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Retail!!!")
	}
}

func Client(goId int) {
	routineId := goId
	fmt.Println("Start Client!!!")
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Client!!!")
	}
}

func Pay(goId int) {
	routineId := goId
	fmt.Println("Start Pay!!!")
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Pay!!!")
	}
}

func Express(goId int) {
	routineId := goId
	fmt.Println("Start Express!!!")
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Express!!!")
	}
}

func Factor(goId int) {
	routineId := goId
	fmt.Println("Start Factor!!!")
	time.Sleep(2 * time.Second)
	ticker := time.NewTicker(200 * time.Millisecond)
	for _ = range ticker.C {
		fmt.Println("Factor!!!")
	}
}
