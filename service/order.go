package service

import (
	"context"
	"example.com/mod/dao"
	"example.com/mod/model"
	"example.com/mod/pkg/e"
	"example.com/mod/serializers"
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

type OrderService struct { //对象复用，机制？减少小对象创建
	ProductId uint    `json:"product_id" form:"product_id"` //form是前端对应数据的字段名
	Num       int     `json:"num" form:"num"`
	AddressId uint    `json:"address_id" form:"address_id"` //修改使用的id
	Money     float64 `json:"money",form:"money"`           //金额可以是小数
	BossId    uint    `json:"boss_id" form:"boss_id"`
	UserId    uint    `json:"user_id" form:"user_id"`
	OrderNum  int     `json:"order_num" form:"order_num"` //订单编号
	Type      int     `json:"type" form:"type"`
	model.BasePage
}

//创建订单
func (service *OrderService) Create(ctx context.Context, uId uint) serializers.Response {
	var order *model.Order //局部变量用小写
	code := e.Success
	//判断商品是否存在
	orderDao := dao.NewOrderDao(ctx)
	order = &model.Order{
		UserId:    uId,
		ProductId: service.ProductId,
		BossId:    service.BossId,
		//AddressId: service.AddressId,
		Num: service.Num,
		//OrderNum:  service,
		Type:  1, //默认未支付
		Money: service.Money,
	}
	//获取地址，检验地址存不存在
	addressDao := dao.NewAddressDao(ctx)
	address, err := addressDao.GetAddressByAddressId(service.AddressId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	order.AddressId = address.ID
	//生成随机订单号！！！
	number := fmt.Sprintf("%09v", rand.New(rand.NewSource(time.Now().UnixNano())).Int31n(100000)) //????
	//加上个性化信息！！！使之复杂
	productNum := strconv.Itoa(int(service.ProductId))
	userNum := strconv.Itoa(int(service.UserId))
	number = number + productNum + userNum
	orderNum, _ := strconv.ParseUint(number, 10, 64)
	order.OrderNum = orderNum //注意类型！！！

	err = orderDao.CreateNewOrder(order)
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

//展示对应id的订单
func (service *OrderService) Show(ctx context.Context, uId uint, oId string) serializers.Response {
	orderId, _ := strconv.Atoi(oId)
	code := e.Success
	orderDao := dao.NewOrderDao(ctx)
	order, err := orderDao.GetOrderByOrderId(uint(orderId), uId) //user的id号订单
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	addressDao := dao.NewAddressDao(ctx)
	address, err := addressDao.GetAddressByAddressId(order.AddressId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	productDao := dao.NewProductDao(ctx)
	product, err := productDao.GetProductById(order.ProductId)
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
		Data:   serializers.BuildOrder(order, address, product),
	}
}

//展示订单列表，uId是前端传的
func (service *OrderService) GetList(ctx context.Context, uId uint) serializers.Response {
	code := e.Success
	if service.PageSize == 0 {
		service.PageSize = 15
	} //分页大小
	orderDao := dao.NewOrderDao(ctx)
	//condition设置
	condition := make(map[string]interface{})
	if service.Type != 0 { //若不设置，则查全部记录，相当于Type==0
		condition["type"] = service.Type
	}
	condition["user_id"] = uId
	orders, total, err := orderDao.ListOrdersByCondition(condition, service.BasePage)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.BuildListResponse(serializers.BuildOrders(ctx, orders), uint(total))
}

//取消订单，软删除
func (service *OrderService) Delete(ctx context.Context, uId uint, aId string) serializers.Response {
	code := e.Success
	orderDao := dao.NewOrderDao(ctx)
	orderId, _ := strconv.Atoi(aId)
	err := orderDao.DeleteOrderByOrderIdAndUserId(uint(orderId), uId)
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
