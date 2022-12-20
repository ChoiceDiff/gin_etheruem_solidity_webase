package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type ProductDao struct {
	*gorm.DB
}

func NewProductDao(ctx context.Context) *ProductDao {
	return &ProductDao{NEWDBClient(ctx)} //新的DAO 对象，内容为新的请求内容ctx
}

func NewProductDaoByDB(db *gorm.DB) *ProductDao { //db复用，减少数据库连接数
	return &ProductDao{db}
}

func (dao *ProductDao) CreateProduct(product *model.Product) (err error) {
	err = dao.DB.Model(&model.Product{}).Create(&product).Error
	return err
}

func (dao *ProductDao) CountProductByCondition(condition map[string]interface{}) (total int64, err error) {
	err = dao.DB.Model(&model.Product{}).Where(condition).Count(&total).Error
	return total, err
}

//返回商品列表
func (dao *ProductDao) ListProductByCondition(condition map[string]interface{}, page model.BasePage) (products []model.Product, err error) {
	err = dao.DB.Where(condition).Offset((page.PageNum - 1) * (page.PageSize)).Limit(page.PageSize).Find(&products).Error //????
	return
}

//搜索商品
func (dao *ProductDao) SearchProduct(productInfo string, page model.BasePage) (products []model.Product, count int64, err error) {
	//先数一下有几个符合条件的记录
	err = dao.DB.Model(&model.Product{}).Where("title LIKE ? OR info LIKE ?", "%"+productInfo+"%", "%"+productInfo+"%").Count(&count).Error //????
	//注意sql的参数个数
	if err != nil {
		return
	}
	err = dao.DB.Where("title LIKE ? OR info LIKE ?", "%"+productInfo+"%", "%"+productInfo+"%"). //sql??????
													Offset((page.PageNum - 1) * (page.PageSize)).
													Limit(page.PageSize).Find(&products).Error //????
	return
}

//根据商品id获取商品
func (dao *ProductDao) GetProductById(id uint) (product *model.Product, err error) {
	err = dao.DB.Model(&model.Product{}).Where("id=?", id).First(&product).Error
	return
}

//UpdateProduct
func (dao *ProductDao) UpdateProduct(productId uint, product *model.Product) error {
	return dao.DB.Model(&model.Product{}).Where("id=?", productId).Updates(&product).Error
}
