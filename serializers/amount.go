package serializers

import (
	"example.com/mod/model"
	"example.com/mod/pkg/util"
)

type Amount struct { //cash amount
	UserId     uint   `json:"user_id" form:"user_id"`
	UserName   string `json:"user_name" form:"user_name"`
	UserAmount string `json:"user_amount" form:"user_amount"`
}

func BuildAmount(item *model.User, key string) Amount {
	util.Encrypt.SetKey(key) //加密解密使用key，注册时已经上传
	return Amount{
		UserId:     item.ID,
		UserName:   item.UserName,
		UserAmount: util.Encrypt.AesDecoding(item.Money),
	}
}
