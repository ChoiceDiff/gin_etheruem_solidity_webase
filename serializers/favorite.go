package serializers

import (
	"context"
	"example.com/mod/conf"
	"example.com/mod/dao"
	"example.com/mod/model"
)

type Favorite struct {
	UserId        uint   `json:"user_id""`
	ProductId     uint   `json:"product_id"`
	CreateAt      int64  `json:"create_at"`
	Name          string `json:"name"`
	CategoryId    uint   `json:"category_id"`
	Title         string `json:"title"`
	Info          string `json:"info"`
	ImgPath       string `json:"img_path"`
	Price         string `json:"price"`
	DiscountPrice string `json:"discount_price"`
	BossId        uint   `json:"boss_id"`
	Num           int    `json:"num"`
	Onsale        bool   `json:"on_sale"`
}

func BuildFavorite(favorite *model.Favorite, product *model.Product, boss *model.User) Favorite { //单个序列化,表关联
	return Favorite{
		UserId:        favorite.UserId,
		ProductId:     favorite.ProductId,
		CreateAt:      favorite.CreatedAt.Unix(),
		Name:          product.Name,
		CategoryId:    product.Category,
		Title:         product.Title,
		Info:          product.Info,
		ImgPath:       conf.Host + conf.HttpPort + conf.ProductPath + product.ImgPath, //注意路径的完整！！！
		Price:         product.Price,
		DiscountPrice: product.DiscountPrice,
		Num:           product.Num,
		Onsale:        product.OnSale,
		BossId:        boss.ID,
	}
}

func BuildFavorites(ctx context.Context, items []*model.Favorite) (Favorites []Favorite) { //多个序列化
	productDao := dao.NewProductDao(ctx)
	bossDao := dao.NewUserDao(ctx)
	for _, item := range items { //索引，元素 for-each
		product, err := productDao.GetProductById(item.ProductId)
		if err != nil {
			continue
		}
		boss, err := bossDao.GetUserById(item.UserId)
		if err != nil {
			continue
		}
		Favorite := BuildFavorite(item, product, boss) //注意类型
		Favorites = append(Favorites, Favorite)
	}
	return Favorites
}
