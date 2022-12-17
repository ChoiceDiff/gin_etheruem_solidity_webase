package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type UserDao struct {
	*gorm.DB
}

func NewUserDao(ctx context.Context) *UserDao {
	return &UserDao{NEWDBClient(ctx)} //新的DAO 对象，内容为新的请求内容ctx
}

func NewUserDaoByDB(db *gorm.DB) *UserDao { //db复用，减少数据库连接数
	return &UserDao{db}
}

//根据username查询用户
func (dao *UserDao) ExistOrNotByUserName(username string) (user *model.User, exist bool, err error) {
	var count int64
	err = dao.DB.Model(&model.User{}).Where("user_name=?", username).Find(&user).Count(&count).Error
	if count == 0 { //user == nil || err == gorm.ErrRecordNotFound?，逻辑错误，user不空
		return nil, false, err
	}
	return user, true, nil
}

func (dao *UserDao) CreateUser(user *model.User) error {
	//Create:inserts value, returning the inserted data's primary key in value's id
	return dao.DB.Model(&model.User{}).Create(&user).Error
}

func (dao *UserDao) GetUserById(uid uint) (user *model.User, err error) {
	err = dao.DB.Model(&model.User{}).Where("id=?", uid).First(&user).Error
	return user, err
}

func (dao *UserDao) UpdateUserById(uid uint, user *model.User) error {
	return dao.DB.Model(&model.User{}).Where("id=?", uid).Updates(&user).Error
}
