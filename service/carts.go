package service

import (
	"context"
	"example.com/mod/dao"
	"example.com/mod/model"
	"example.com/mod/pkg/e"
	"example.com/mod/serializers"
	"strconv"
)

type CartService struct {
	Id        uint `json:"id" form:"id"` //修改使用的id
	BossId    uint `json:"boss_id" form:"boss_id"`
	ProductId uint `json:"product_id" form:"product_id"`
	Num       int  `json:"num" form:"num"`
}

//添加购物车
func (service *CartService) Create(ctx context.Context, uId uint) serializers.Response {
	var cart *model.Cart
	code := e.Success
	//判断商品是否存在
	productDao := dao.NewProductDao(ctx)
	product, err := productDao.GetProductById(service.ProductId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	bossDao := dao.NewUserDao(ctx)
	boss, err := bossDao.GetUserById(service.BossId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	cartDao := dao.NewCartDao(ctx)
	cart = &model.Cart{
		UserId:    uId,
		BossId:    service.BossId,
		ProductId: service.ProductId,
		Num:       uint(service.Num),
	}
	err = cartDao.CreateNewCart(cart)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
		Data:   serializers.BuildCart(cart, product, boss),
	}
}

//展示购物车记录列表
func (service *CartService) GetList(ctx context.Context, uId uint) serializers.Response {
	code := e.Success
	cartDao := dao.NewCartDao(ctx)
	carts, err := cartDao.GetCartsByUserId(uId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
		Data:   serializers.BuildCarts(ctx, carts),
	}
}

//更新购物车记录，只能更新数量
func (service *CartService) Update(ctx context.Context, uId uint, aId string) serializers.Response {
	code := e.Success
	cartDao := dao.NewCartDao(ctx)
	cartId, _ := strconv.Atoi(aId)
	err := cartDao.UpdateCartNumByCartId(uint(cartId), service.Num)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
	}
}

//删除购物车记录，软删除
func (service *CartService) Delete(ctx context.Context, uId uint, aId string) serializers.Response {
	code := e.Success
	cartDao := dao.NewCartDao(ctx)
	cartId, _ := strconv.Atoi(aId)
	err := cartDao.DeleteCartByCartIdAndUserId(uint(cartId), uId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
	}
}
