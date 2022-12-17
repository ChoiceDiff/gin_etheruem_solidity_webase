package service

import (
	"context"
	"example.com/mod/dao"
	"example.com/mod/model"
	"example.com/mod/pkg/e"
	"example.com/mod/serializers"
	"strconv"
)

type AddressService struct {
	Name    string `json:"name" form:"name"`
	Phone   string `json:"phone" form:"phone"`
	Address string `json:"address" form:"address"`
}

//添加地址
func (service *AddressService) Create(ctx context.Context, uId uint) serializers.Response {
	var address *model.Address
	code := e.Success
	addressDao := dao.NewAddressDao(ctx)
	address = &model.Address{
		UserId:  uId,
		Name:    service.Name,
		Phone:   service.Phone,
		Address: service.Address,
	}
	err := addressDao.CreateNewAddress(address)
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

//展示对应一条地址by Id
func (service *AddressService) GetOne(ctx context.Context, aId string) serializers.Response {
	addressId, _ := strconv.Atoi(aId)
	code := e.Success
	addressDao := dao.NewAddressDao(ctx)
	address, err := addressDao.GetAddressByAddressId(uint(addressId))
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
		Data:   serializers.BuildAddress(address),
	}
}

//获取全部地址列表by userId
func (service *AddressService) GetList(ctx context.Context, uId uint) serializers.Response {
	code := e.Success
	addressDao := dao.NewAddressDao(ctx)
	addressList, err := addressDao.ListAddressByUserId(uId)
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
		Data:   serializers.BuildAddresses(addressList),
	}
}

//更新地址，地址由aId和userId共同确定，但aId是主键
func (service *AddressService) Update(ctx context.Context, uId uint, aId string) serializers.Response {
	var address *model.Address
	code := e.Success
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

//删除地址
func (service *AddressService) Delete(ctx context.Context, uId uint, aId string) serializers.Response {
	code := e.Success
	addressDao := dao.NewAddressDao(ctx)
	addressId, _ := strconv.Atoi(aId)
	err := addressDao.DeleteAddressByAddressIdAndUserId(uint(addressId), uId)
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
