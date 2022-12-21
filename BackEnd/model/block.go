package model

type Block struct {
	Height    uint
	TimeStamp string
	PrevHash  []byte
	Txs       []Transaction
}
