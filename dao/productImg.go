package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type ProductImgDao struct {
	*gorm.DB
}

func NewProductImgDao(ctx context.Context) *ProductImgDao {
	return &ProductImgDao{NEWDBClient(ctx)} //新的DAO 对象，内容为新的请求内容ctx
}

func NewProductImgDaoByDB(db *gorm.DB) *ProductImgDao { //db复用，减少数据库连接数
	return &ProductImgDao{db}
}

func (dao *ProductImgDao) CreateProductImg(productImg *model.ProductImg) (err error) { //创建图片
	err = dao.DB.Model(&model.ProductImg{}).Create(&productImg).Error
	return err
}

func (dao *ProductImgDao) ListProductImg(id uint) (productImg []*model.ProductImg, err error) { //创建图片
	err = dao.DB.Model(&model.ProductImg{}).Where("product_id=?", id).Find(&productImg).Error
	return
}
