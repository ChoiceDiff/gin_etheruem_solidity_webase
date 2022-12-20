package serializers

import (
	"example.com/mod/BackEnd/conf"
	"example.com/mod/model"
)

type ProductImg struct {
	ProductId uint   `json:"product_id"`
	ImgPath   string `json:"img_path"`
}

func BuildProductImg(item *model.ProductImg) ProductImg {
	return ProductImg{
		ProductId: item.ProductId,
		ImgPath:   conf.Host + conf.HttpPort + conf.ProductPath + item.ImgPath,
	}
}

func BuildProductImgs(items []*model.ProductImg) (productImgs []ProductImg) {
	for _, item := range items {
		productImg := BuildProductImg(item)
		productImgs = append(productImgs, productImg)
	}
	return
}
