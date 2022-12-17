package model

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	sender   []byte
	receiver []byte
	product  Product
	num      uint
	money    float64
}
