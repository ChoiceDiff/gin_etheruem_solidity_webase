package serializers

import (
	"context"
	"example.com/mod/conf"
	"example.com/mod/dao"
	"example.com/mod/model"
)

type Cart struct {
	Id            uint   `json:"id"`
	UserId        uint   `json:"user_id"`
	ProductId     uint   `json:"product_id"`
	CreateAt      int64  `json:"create_at"`
	Num           int    `json:"num"`
	Name          string `json:"name"`
	MaxNum        int    `json:"max_num"`
	ImgPath       string `json:"img_path"`
	Check         bool   `json:"check"`
	DiscountPrice string `json:"discount_price"`
	BossId        uint   `json:"boss_id"`
	BossName      string `json:"boss_name"`
}

func BuildCart(cart *model.Cart, product *model.Product, boss *model.User) Cart {
	return Cart{
		Id:            cart.ID,
		UserId:        cart.UserId,
		ProductId:     cart.ProductId,
		CreateAt:      cart.CreatedAt.Unix(),
		Num:           int(cart.Num),
		Name:          product.Name,
		MaxNum:        int(cart.MaxNum),
		ImgPath:       conf.Host + conf.HttpPort + conf.ProductPath + product.ImgPath,
		Check:         cart.Check,
		DiscountPrice: product.DiscountPrice,
		BossId:        boss.ID,
		BossName:      boss.UserName,
	}
}

func BuildCarts(ctx context.Context, items []model.Cart) (carts []Cart) { //多个序列化
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
		cart := BuildCart(&item, product, boss) //注意类型
		carts = append(carts, cart)
	}
	return carts
}
