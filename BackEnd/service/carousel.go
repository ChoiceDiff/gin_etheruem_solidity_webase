package service

import (
	"example.com/mod/BackEnd/dao"
	e2 "example.com/mod/BackEnd/pkg/e"
	"example.com/mod/BackEnd/pkg/util"
	serializers2 "example.com/mod/BackEnd/serializers"
	"golang.org/x/net/context"
)

type CarouselService struct {
}

func (service *CarouselService) List(ctx context.Context) serializers2.Response {
	code := e2.Success
	carouselDao := dao.NewCarouselDao(ctx)

	carousels, err := carouselDao.ListCarousel()
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e2.Error
		return serializers2.Response{
			Status: code,
			Msg:    e2.GetMsg(code),
		}
	}
	return serializers2.BuildListResponse(serializers2.BuildCarousels(carousels), uint(len(carousels)))
}
