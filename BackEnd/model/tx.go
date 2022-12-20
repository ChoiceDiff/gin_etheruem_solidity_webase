package model

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	Sender   []byte
	Receiver []byte
	Product  Product
	Num      uint
	Money    float64
}
