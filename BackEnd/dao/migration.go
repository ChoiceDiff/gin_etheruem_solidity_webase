package dao

import (
	"example.com/mod/model"
	"fmt"
)

func migration() {
	err := _db.Set("gorm:table_options", "charset=utf8mb4").
		AutoMigrate(
			&model.Address{},
			&model.Admin{},
			&model.Carousel{},
			&model.User{},
			&model.Cart{},
			&model.Favorite{},
			&model.Notice{},
			&model.Order{},
			&model.Product{},
			&model.ProductImg{},
			&model.Category{},
			&model.BlockChainAccount{},
			&model.Block{},
			&model.Transaction{},
		)
	if err != nil {
		fmt.Println("err", err)
	}
	return
}
