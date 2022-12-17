package model

import "gorm.io/gorm"

type BlockChainAccount struct {
	gorm.Model
	publicKey  []byte  `json:"public_key"`
	privateKey []byte  `json:"private_key"`
	address    []byte  `json:"address"`
	name       string  `json:"name"`
	role       byte    `json:"role"`
	nonce      uint64  `json:"nonce"` //交易次数
	money      float64 `json:"money"`
	reputation int64   `json:"reputation"` //节点信誉
}
