package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type CategoryDao struct {
	*gorm.DB
}

func NewCategoryDao(ctx context.Context) *CategoryDao {
	return &CategoryDao{NEWDBClient(ctx)}
}

func NewCategoryDaoByDB(db *gorm.DB) *CategoryDao {
	return &CategoryDao{db}
}

func (dao *CategoryDao) ListCategory() (Category []model.Category, err error) { //找到所有符合条件的，用数组
	err = dao.DB.Model(&model.Category{}).Find(&Category).Error //所有行
	return Category, err
}
