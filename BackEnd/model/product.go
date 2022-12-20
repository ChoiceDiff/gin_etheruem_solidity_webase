package model

import (
	"example.com/mod/cache"
	"gorm.io/gorm"
	"strconv"
)

type Product struct {
	gorm.Model
	Name          string
	Category      uint
	Title         string
	Info          string
	ImgPath       string
	Price         string
	DiscountPrice string
	OnSale        bool `gorm:"default:false"`
	Num           int
	BossId        uint //拥有者
	BossName      string
	BossAvatar    string
}

func (product *Product) View() uint64 { //浏览次数
	countStr, _ := cache.RedisClient.Get(cache.ProductViewKey(product.ID)).Result() //返回对应的值,string,error
	count, _ := strconv.ParseUint(countStr, 10, 64)
	return count
}

func (product *Product) AddView() {
	//增加商品点击次数
	cache.RedisClient.Incr(cache.ProductViewKey(product.ID))                   //https://blog.csdn.net/blingblingfu/article/details/122072535
	cache.RedisClient.ZIncrBy(cache.RankKey, 1, strconv.Itoa(int(product.ID))) //????
}
