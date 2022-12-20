package model

type Block struct {
	Height    uint
	TimeStamp string
	Txs       []Transaction
}
