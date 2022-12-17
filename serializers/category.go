package serializers

import "example.com/mod/model"

type Category struct {
	Id           uint   `json:"id"`
	CategoryName string `json:"category_name"`
	CreateAt     int64  `json:"create_at"`
}

func BuildCategory(item *model.Category) Category { //单个序列化
	return Category{
		Id:           item.ID,
		CategoryName: item.CategoryName,
		CreateAt:     item.CreatedAt.Unix(),
	}
}

func BuildCategorys(items []model.Category) (categorys []Category) { //多个序列化
	for _, item := range items { //索引，元素 for-each
		category := BuildCategory(&item)
		categorys = append(categorys, category)
	}
	return categorys
}
