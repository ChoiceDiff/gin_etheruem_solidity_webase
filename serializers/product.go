package serializers

import (
	"example.com/mod/conf"
	"example.com/mod/model"
)

type Product struct {
	Id            uint   `json:"id"`
	Name          string `json:"name"`
	Category      uint   `json:"category"`
	Title         string `json:"title"`
	Info          string `json:"info"`
	ImgPath       string `json:"img_path"`
	Price         string `json:"price"`
	DiscountPrice string `json:"discount_price"`
	View          uint64 `json:"view"` //访问次数
	CreateAt      int64  `json:"create_at"`
	Num           int    `json:"num"`
	OnSale        bool   `json:"on_sale"` //默认上架
	BossId        uint   `json:"boss_id"`
	BossName      string `json:"boss_name"`
	BossAvatar    string `json:"boss_avatar"`
}

func BuildProduct(item *model.Product) Product { //为了返回数据结构而设计
	return Product{
		Id:            item.ID, //id和createAt都在内置gorm.model里面
		Name:          item.Name,
		Category:      item.Category,
		Title:         item.Title,
		Info:          item.Info,
		ImgPath:       conf.Host + conf.HttpPort + conf.ProductPath + item.ImgPath,
		Price:         item.Price,
		DiscountPrice: item.DiscountPrice,
		View:          item.View(), //cache redis
		CreateAt:      item.CreatedAt.Unix(),
		Num:           item.Num,
		OnSale:        item.OnSale,
		BossId:        item.BossId,
		BossName:      item.BossName,
		BossAvatar:    conf.Host + conf.HttpPort + conf.AvatarPath + item.BossAvatar,
	}
}

func BuildProducts(items []model.Product) (products []Product) { //复数调用单数
	for _, item := range items {
		product := BuildProduct(&item)
		products = append(products, product)
	}
	return products
}
