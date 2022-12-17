package service

import (
	"context"
	"example.com/mod/dao"
	"example.com/mod/pkg/e"
	"example.com/mod/pkg/util"
	"example.com/mod/serializers"
)

type CategoryService struct {
}

//List
func (service *CategoryService) List(ctx context.Context) serializers.Response {
	code := e.Success
	categoryDao := dao.NewCategoryDao(ctx)

	category, err := categoryDao.ListCategory()
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.BuildListResponse(serializers.BuildCategorys(category), uint(len(category)))
}
