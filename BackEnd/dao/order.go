package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type OrderDao struct {
	*gorm.DB
}

func NewOrderDao(ctx context.Context) *OrderDao {
	return &OrderDao{NEWDBClient(ctx)}
}

func NewOrderDaoByDB(db *gorm.DB) *OrderDao {
	return &OrderDao{db}
}

//CreateNewOrder
func (dao *OrderDao) CreateNewOrder(order *model.Order) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Order{}).Create(order).Error
}

//GetOrderById，这里的Id是记录序号不是UserId
func (dao *OrderDao) GetOrderByOrderId(id uint, uId uint) (order *model.Order, err error) { //
	err = dao.DB.Model(&model.Order{}).Where("id=? AND user_id=?", id, uId).First(&order).Error
	return order, err
}

//显示该用户所有订单
func (dao *OrderDao) GetOrdersByUserId(uId uint) (orders []model.Order, err error) { //找到所有符合条件的，用数组
	err = dao.DB.Model(&model.Order{}).Where("user_id=?", uId).Find(&orders).Error //所有行
	return orders, err
}

//UpdateOrderByOrderId
func (dao *OrderDao) UpdateOrderByOrderId(OrderId uint, Order *model.Order) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Order{}).Where("id=?", OrderId).Updates(&Order).Error
}

//UpdateOrderNumByOrderId
func (dao *OrderDao) UpdateOrderNumByOrderId(OrderId uint, num int) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Order{}).Where("id=?", OrderId).Update("num", num).Error
}

//DeleteOrderByOrderIdAndUserId
func (dao *OrderDao) DeleteOrderByOrderIdAndUserId(OrderId uint, uId uint) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Order{}).Where("id=? AND user_id=?", OrderId, uId).Delete(&model.Order{}).Error
}

//ListOrdersByCondition
func (dao *OrderDao) ListOrdersByCondition(condition map[string]interface{}, page model.BasePage) (orders []model.Order, total int64, err error) { //找到所有符合条件的，用数组
	err = dao.DB.Model(&model.Order{}).Where(condition).Count(&total).Error
	err = dao.DB.Model(&model.Order{}).Where(condition).Offset((page.PageNum - 1) * (page.PageSize)).Limit(page.PageSize).Find(&orders).Error //&orders，这里返回的是分页的大小
	return
}
