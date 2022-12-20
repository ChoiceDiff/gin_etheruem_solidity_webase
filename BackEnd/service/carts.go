package service

import (
	"context"
	dao2 "example.com/mod/BackEnd/dao"
	e2 "example.com/mod/BackEnd/pkg/e"
	serializers2 "example.com/mod/BackEnd/serializers"
	"example.com/mod/model"
	"strconv"
)

type CartService struct {
	Id        uint `json:"id" form:"id"` //修改使用的id
	BossId    uint `json:"boss_id" form:"boss_id"`
	ProductId uint `json:"product_id" form:"product_id"`
	Num       int  `json:"num" form:"num"`
}

//添加购物车
func (service *CartService) Create(ctx context.Context, uId uint) serializers2.Response {
	var cart *model.Cart
	code := e2.Success
	//判断商品是否存在
	productDao := dao2.NewProductDao(ctx)
	product, err := productDao.GetProductById(service.ProductId)
	if err != nil {
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	bossDao := dao2.NewUserDao(ctx)
	boss, err := bossDao.GetUserById(service.BossId)
	if err != nil {
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	cartDao := dao2.NewCartDao(ctx)
	cart = &model.Cart{
		UserId:    uId,
		BossId:    service.BossId,
		ProductId: service.ProductId,
		Num:       uint(service.Num),
	}
	err = cartDao.CreateNewCart(cart)
	if err != nil {
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	return serializers2.Response{
		Status: code,
		Msg:    e2.GetMsg(code),
		Data:   serializers2.BuildCart(cart, product, boss),
	}
}

//展示购物车记录列表
func (service *CartService) GetList(ctx context.Context, uId uint) serializers2.Response {
	code := e2.Success
	cartDao := dao2.NewCartDao(ctx)
	carts, err := cartDao.GetCartsByUserId(uId)
	if err != nil {
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	return serializers2.Response{
		Status: code,
		Msg:    e2.GetMsg(code),
		Data:   serializers2.BuildCarts(ctx, carts),
	}
}

//更新购物车记录，只能更新数量
func (service *CartService) Update(ctx context.Context, uId uint, aId string) serializers2.Response {
	code := e2.Success
	cartDao := dao2.NewCartDao(ctx)
	cartId, _ := strconv.Atoi(aId)
	err := cartDao.UpdateCartNumByCartId(uint(cartId), service.Num)
	if err != nil {
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  err.Error(),
		}
	}
	return serializers2.Response{
		Status: code,
		Msg:    e2.GetMsg(code),
	}
}

//删除购物车记录，软删除
func (service *CartService) Delete(ctx context.Context, uId uint, aId string) serializers2.Response {
	code := e2.Success
	cartDao := dao2.NewCartDao(ctx)
	cartId, _ := strconv.Atoi(aId)
	err := cartDao.DeleteCartByCartIdAndUserId(uint(cartId), uId)
	if err != nil {
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	return serializers2.Response{
		Status: code,
		Msg:    e2.GetMsg(code),
	}
}
