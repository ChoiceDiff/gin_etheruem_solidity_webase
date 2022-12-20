package serializers

import (
	"context"
	"example.com/mod/BackEnd/conf"
	dao2 "example.com/mod/BackEnd/dao"
	"example.com/mod/model"
)

type Order struct {
	Id           uint    `json:"id"`
	OrderNum     uint64  `json:"order_num""`
	CreatedAt    int64   `json:"created_at"`
	UpdatedAt    int64   `json:"updated_at"`
	UserId       uint    `json:"user_id"`
	ProductId    uint    `json:"product_id"`
	BossId       uint    `json:"boss_id"`
	Num          int     `json:"num"` //商品数量
	AddressName  string  `json:"address_name"`
	AddressPhone string  `json:"address_phone"`
	Address      string  `json:"address"`
	Type         uint    `json:"type"`
	ProductName  string  `json:"product_name"`
	ImgPath      string  `json:"img_path"`
	Money        float64 `json:"money"`
}

func BuildOrder(order *model.Order, address *model.Address, product *model.Product) Order {
	return Order{
		Id:           order.ID,
		OrderNum:     order.OrderNum,
		CreatedAt:    order.CreatedAt.Unix(),
		UpdatedAt:    order.UpdatedAt.Unix(),
		UserId:       order.UserId,
		ProductId:    order.ProductId,
		BossId:       order.BossId,
		Num:          order.Num,
		AddressName:  address.Name,
		AddressPhone: address.Phone,
		Address:      address.Address,
		Type:         order.Type,
		ProductName:  product.Name,
		ImgPath:      conf.Host + conf.HttpPort + conf.ProductPath + product.ImgPath,
		Money:        order.Money,
	}
}

func BuildOrders(ctx context.Context, items []model.Order) (orders []Order) { //多个序列化
	productDao := dao2.NewProductDao(ctx)
	addressDao := dao2.NewAddressDao(ctx)
	for _, item := range items { //索引，元素 for-each
		product, err := productDao.GetProductById(item.ProductId)
		if err != nil {
			continue
		}
		address, err := addressDao.GetAddressByAddressId(item.AddressId)
		if err != nil {
			continue
		}
		order := BuildOrder(&item, address, product) //注意类型
		orders = append(orders, order)
	}
	return orders
}
