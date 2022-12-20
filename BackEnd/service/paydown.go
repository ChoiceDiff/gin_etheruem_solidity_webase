package service

import (
	"context"
	"errors"
	dao2 "example.com/mod/BackEnd/dao"
	e2 "example.com/mod/BackEnd/pkg/e"
	util2 "example.com/mod/BackEnd/pkg/util"
	"example.com/mod/BackEnd/serializers"
	"example.com/mod/model"
	"fmt"
	"strconv"
)

type OrderPay struct {
	OrderId   uint    `json:"order_id" form:"order_id"`
	Money     float64 `json:"money" form:"money"`
	OrderNo   string  `json:"order_no" form:"order_no"`
	ProductId uint    `json:"product_id" form:"product_id"`
	PayTime   string  `json:"pay_time" form:"pay_time"`
	Sign      string  `json:"sign" form:"sign"`
	BossId    uint    `json:"boss_id" form:"boss_id"`
	BossName  string  `json:"boss_name" form:"boss_name"`
	Num       int     `json:"num" form:"num"`
	Key       string  `json:"key" form:"key"` //支付金额
}

func (service *OrderPay) PayDown(ctx context.Context, uId uint) serializers.Response {
	util2.Encrypt.SetKey(service.Key)
	code := e2.Success
	orderDao := dao2.NewOrderDao(ctx)
	//原子操作
	tx := orderDao.Begin()
	order, err := orderDao.GetOrderByOrderId(service.OrderId, uId)
	if err != nil {
		util2.LogrusObj.Infoln("err", err)
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	//价格
	money := order.Money
	num := order.OrderNum
	money = money * float64(num)
	userDao := dao2.NewUserDao(ctx)
	user, err := userDao.GetUserById(uId)
	//解密余额，扣款，加密
	moneyStr := util2.Encrypt.AesDecoding(user.Money)
	moneyFloat, _ := strconv.ParseFloat(moneyStr, 64)

	if moneyFloat-money < 0.0 { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  errors.New("Amount is Not Enough").Error(),
		}
	}
	finMoney := fmt.Sprintf("%f", moneyFloat-money)
	user.Money = util2.Encrypt.AesEncoding(finMoney) //加密后的新余额
	err = userDao.UpdateUserById(uId, user)
	if err != nil { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  errors.New("Amount is Not Enough").Error(),
		}
	}

	var boss *model.User
	boss, err = userDao.GetUserById(service.BossId)
	if err != nil { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  errors.New("Amount is Not Enough").Error(),
		}
	}
	//解密余额，收款，加密
	moneyStr = util2.Encrypt.AesDecoding(boss.Money)
	moneyFloat, _ = strconv.ParseFloat(moneyStr, 64)
	finMoney = fmt.Sprintf("%f", moneyFloat+money)
	boss.Money = util2.Encrypt.AesEncoding(finMoney) //加密后的新余额

	err = userDao.UpdateUserById(boss.ID, boss)
	if err != nil { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  err.Error(),
		}
	}

	//对应的商品数目 -1
	var product *model.Product
	productDao := dao2.NewProductDao(ctx)
	product, err = productDao.GetProductById(service.ProductId)
	product.Num -= int(num)
	if err != nil { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  err.Error(),
		}
	}
	//更新商品状态
	err = productDao.UpdateProduct(service.ProductId, product)
	if err != nil { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  err.Error(),
		}
	}
	//删除订单
	err = orderDao.DeleteOrderByOrderIdAndUserId(service.OrderId, uId)
	if err != nil { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  err.Error(),
		}
	}
	//自己的商品 +1 同一件商品怎么办？商品标识号，键的安排，可以模拟币的数量
	productUser := model.Product{
		Name:          product.Name,
		Category:      product.Category,
		Title:         product.Title,
		Info:          product.Info,
		ImgPath:       product.ImgPath,
		Price:         product.Price,
		DiscountPrice: product.DiscountPrice,
		OnSale:        false,
		Num:           1,
		BossId:        uId,
		BossName:      user.UserName,
		BossAvatar:    user.Avatar,
	}
	err = productDao.CreateProduct(&productUser)
	if err != nil { //回滚
		tx.Rollback()
		code = e2.Error
		return serializers.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
			Error:  err.Error(),
		}
	}
	tx.Commit() //与begin()对应
	return serializers.Response{
		Status: code,
		Msg:    e2.GetMsg(code),
	}
}
