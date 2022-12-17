package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type FavoriteDao struct {
	*gorm.DB
}

func NewFavoriteDao(ctx context.Context) *FavoriteDao {
	return &FavoriteDao{NEWDBClient(ctx)}
}

func NewFavoriteDaoByDB(db *gorm.DB) *FavoriteDao {
	return &FavoriteDao{db}
}

func (dao *FavoriteDao) ListFavorite(uId uint) (favorites []*model.Favorite, err error) {
	err = dao.DB.Model(&model.Favorite{}).Where("user_id=?", uId).Find(&favorites).Error
	return
}

//根据pId和uId两个参数来判断是否存在该收藏记录
func (dao *FavoriteDao) FavoriteExistOrNot(pId, uId uint) (exist bool, err error) {
	var count int64
	err = dao.DB.Model(&model.Favorite{}).Where("product_id=? AND user_id=?", pId, uId).Count(&count).Error
	if err != nil || 0 == count {
		return false, err
	}
	return true, nil
}

//添加（创建）收藏记录
func (dao *FavoriteDao) CreateFavorite(addFavorite *model.Favorite) error {
	return dao.DB.Model(&model.Favorite{}).Create(&addFavorite).Error
}

//删除，重要的索引放前面
func (dao *FavoriteDao) DeleteFavorite(pId, fId uint) error {
	return dao.DB.Model(&model.Favorite{}).Where("id=? AND product_id=?", fId, pId).Delete(&model.Favorite{}).Error
}
