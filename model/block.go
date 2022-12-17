package model

type Block struct {
	height    uint
	timeStamp string
	txs       []Transaction
}
