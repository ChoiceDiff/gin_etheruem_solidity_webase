package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type CartDao struct {
	*gorm.DB
}

func NewCartDao(ctx context.Context) *CartDao {
	return &CartDao{NEWDBClient(ctx)}
}

func NewCartDaoByDB(db *gorm.DB) *CartDao {
	return &CartDao{db}
}

//CreateNewCart
func (dao *CartDao) CreateNewCart(cart *model.Cart) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Cart{}).Create(cart).Error
}

//GetCartById，这里的aId是记录序号不是UserId
func (dao *CartDao) GetCartByCartId(cId uint) (cart *model.Cart, err error) { //
	err = dao.DB.Model(&model.Cart{}).Where("id=?", cId).First(&cart).Error
	return cart, err
}

//显示该用户所有购物车记录
func (dao *CartDao) GetCartsByUserId(uId uint) (carts []model.Cart, err error) { //找到所有符合条件的，用数组
	err = dao.DB.Model(&model.Cart{}).Where("user_id=?", uId).Find(&carts).Error //所有行
	return carts, err
}

//UpdateCartByCartId
func (dao *CartDao) UpdateCartByCartId(cartId uint, cart *model.Cart) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Cart{}).Where("id=?", cartId).Updates(&cart).Error
}

//UpdateCartNumByCartId
func (dao *CartDao) UpdateCartNumByCartId(cartId uint, num int) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Cart{}).Where("id=?", cartId).Update("num", num).Error
}

//DeleteCartByCartIdAndUserId
func (dao *CartDao) DeleteCartByCartIdAndUserId(cartId uint, uId uint) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Cart{}).Where("id=? AND user_id=?", cartId, uId).Delete(&model.Cart{}).Error
}
