package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type CarouselDao struct {
	*gorm.DB
}

func NewCarouselDao(ctx context.Context) *CarouselDao {
	return &CarouselDao{NEWDBClient(ctx)}
}

func NewCarouselDaoByDB(db *gorm.DB) *CarouselDao {
	return &CarouselDao{db}
}

func (dao *CarouselDao) ListCarousel() (Carousel []model.Carousel, err error) { //找到所有符合条件的，用数组
	err = dao.DB.Model(&model.Carousel{}).Find(&Carousel).Error //所有行
	return Carousel, err
}
