package model

import "gorm.io/gorm"

type BlockChainAccount struct {
	gorm.Model
	PublicKey  []byte  `json:"public_key"`
	PrivateKey []byte  `json:"private_key"`
	Address    []byte  `json:"address"`
	Name       string  `json:"name"`
	Role       byte    `json:"role"`
	Nonce      uint64  `json:"nonce"` //交易次数
	Money      float64 `json:"money"`
	Reputation int64   `json:"reputation"` //节点信誉
}
