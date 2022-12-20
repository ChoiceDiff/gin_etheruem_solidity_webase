package service

import (
	"context"
	"example.com/mod/BackEnd/dao"
	e2 "example.com/mod/BackEnd/pkg/e"
	serializers2 "example.com/mod/BackEnd/serializers"
	"example.com/mod/model"
	"strconv"
)

type AddressService struct {
	Name    string `json:"name" form:"name"`
	Phone   string `json:"phone" form:"phone"`
	Address string `json:"address" form:"address"`
}

//添加地址
func (service *AddressService) Create(ctx context.Context, uId uint) serializers2.Response {
	var address *model.Address
	code := e2.Success
	addressDao := dao.NewAddressDao(ctx)
	address = &model.Address{
		UserId:  uId,
		Name:    service.Name,
		Phone:   service.Phone,
		Address: service.Address,
	}
	err := addressDao.CreateNewAddress(address)
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

//展示对应一条地址by Id
func (service *AddressService) GetOne(ctx context.Context, aId string) serializers2.Response {
	addressId, _ := strconv.Atoi(aId)
	code := e2.Success
	addressDao := dao.NewAddressDao(ctx)
	address, err := addressDao.GetAddressByAddressId(uint(addressId))
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
		Data:   serializers2.BuildAddress(address),
	}
}

//获取全部地址列表by userId
func (service *AddressService) GetList(ctx context.Context, uId uint) serializers2.Response {
	code := e2.Success
	addressDao := dao.NewAddressDao(ctx)
	addressList, err := addressDao.ListAddressByUserId(uId)
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
		Data:   serializers2.BuildAddresses(addressList),
	}
}

//更新地址，地址由aId和userId共同确定，但aId是主键
func (service *AddressService) Update(ctx context.Context, uId uint, aId string) serializers2.Response {
	var address *model.Address
	code := e2.Success
	addressDao := dao.NewAddressDao(ctx)
	address = &model.Address{
		UserId:  uId,
		Name:    service.Name,
		Phone:   service.Phone,
		Address: service.Address,
	}
	addressId, _ := strconv.Atoi(aId)
	err := addressDao.UpdateAddressByAddressId(uint(addressId), address)
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

//删除地址
func (service *AddressService) Delete(ctx context.Context, uId uint, aId string) serializers2.Response {
	code := e2.Success
	addressDao := dao.NewAddressDao(ctx)
	addressId, _ := strconv.Atoi(aId)
	err := addressDao.DeleteAddressByAddressIdAndUserId(uint(addressId), uId)
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
