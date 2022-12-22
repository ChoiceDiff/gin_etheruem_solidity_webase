package Consensus

type Transaction struct {
	Sender   []byte
	Receiver []byte
	Product  uint
	//Product  Product
	Num   uint
	Price float64
	Money float64
}
