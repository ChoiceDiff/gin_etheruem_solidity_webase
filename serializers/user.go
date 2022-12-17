package serializers

import (
	"example.com/mod/conf"
	"example.com/mod/model"
)

type User struct { //vo view objective 用于返回的用户信息
	ID       uint   `json:"ID,omitempty"`
	UserName string `json:"user_name"`
	NickName string `json:"nick_name"`
	Type     int    `json:"type"`
	Email    string `json:"email"`
	Status   string `json:"status"` //是否被封号
	Avatar   string `json:"avatar"`
	CreateAt int64  `json:"create_at"` //omitempty默认为空
}

func BuildUser(user *model.User) *User {
	return &User{
		ID:       user.ID,
		UserName: user.UserName,
		NickName: user.NickName,
		//Type:     0,用户类型
		Email:    user.Email,
		Status:   user.Status,
		Avatar:   conf.Host + conf.HttpPort + conf.AvatarPath + user.Avatar, //本地图片，完整路径
		CreateAt: user.CreatedAt.Unix(),                                     //int64
	}
}
