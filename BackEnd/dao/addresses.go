package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type AddressDao struct {
	*gorm.DB
}

func NewAddressDao(ctx context.Context) *AddressDao {
	return &AddressDao{NEWDBClient(ctx)}
}

func NewAddressDaoByDB(db *gorm.DB) *AddressDao {
	return &AddressDao{db}
}

//CreateNewAddress
func (dao *AddressDao) CreateNewAddress(Address *model.Address) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Address{}).Create(Address).Error
}

//GetAddressById，这里的aId是地址序号不是UserId
func (dao *AddressDao) GetAddressByAddressId(aId uint) (address *model.Address, err error) { //
	err = dao.DB.Model(&model.Address{}).Where("id=?", aId).First(&address).Error
	return address, err
}

func (dao *AddressDao) ListAddressByUserId(uId uint) (Address []model.Address, err error) { //找到所有符合条件的，用数组
	err = dao.DB.Model(&model.Address{}).Where("user_id=?", uId).Find(&Address).Error //所有行
	return Address, err
}

//UpdateAddressByAddressId
func (dao *AddressDao) UpdateAddressByAddressId(aId uint, address *model.Address) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Address{}).Where("id=?", aId).Updates(&address).Error
}

//DeleteAddressByAddressIdAndUserId
func (dao *AddressDao) DeleteAddressByAddressIdAndUserId(aId uint, uId uint) error { //找到所有符合条件的，用数组
	return dao.DB.Model(&model.Address{}).Where("id=? AND user_id=?", aId, uId).Delete(&model.Address{}).Error
}
