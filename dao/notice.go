package dao

import (
	"context"
	"example.com/mod/model"
	"gorm.io/gorm"
)

type NoticeDao struct {
	*gorm.DB
}

func NewNoticeDao(ctx context.Context) *NoticeDao {
	return &NoticeDao{NEWDBClient(ctx)} //新的DAO 对象，内容为新的请求内容ctx
}

func NewNoticeDaoByDB(db *gorm.DB) *NoticeDao { //db复用，减少数据库连接数
	return &NoticeDao{db}
}

func (dao *NoticeDao) GetNoticeById(operationType uint) (notice *model.Notice, err error) {
	err = dao.DB.Model(&model.Notice{}).Where("id=?", operationType).First(&notice).Error
	return notice, err
}
