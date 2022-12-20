package service

import (
	"context"
	"example.com/mod/BackEnd/dao"
	e2 "example.com/mod/BackEnd/pkg/e"
	"example.com/mod/BackEnd/pkg/util"
	serializers2 "example.com/mod/BackEnd/serializers"
)

type CategoryService struct {
}

//List
func (service *CategoryService) List(ctx context.Context) serializers2.Response {
	code := e2.Success
	categoryDao := dao.NewCategoryDao(ctx)

	category, err := categoryDao.ListCategory()
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	return serializers2.BuildListResponse(serializers2.BuildCategorys(category), uint(len(category)))
}
