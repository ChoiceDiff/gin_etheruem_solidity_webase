package serializers

import (
	"example.com/mod/model"
)

type Carousel struct {
	Id        uint   `json:"id"`
	ImgPath   string `json:"img_path"`
	ProductId uint   `json:"product_id"`
	CreateAt  int64  `json:"create_at"`
}

func BuildCarousel(item *model.Carousel) Carousel { //单个序列化
	return Carousel{
		Id:        item.ID,
		ImgPath:   item.ImgPath,
		ProductId: item.ProductId,
		CreateAt:  item.CreatedAt.Unix(),
	}
}

func BuildCarousels(items []model.Carousel) (carousels []Carousel) { //多个序列化
	for _, item := range items { //索引，元素 for-each
		carousel := BuildCarousel(&item)
		carousels = append(carousels, carousel)
	}
	return carousels
}
