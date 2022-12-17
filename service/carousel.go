package service

import (
	"example.com/mod/dao"
	"example.com/mod/pkg/e"
	"example.com/mod/pkg/util"
	"example.com/mod/serializers"
	"golang.org/x/net/context"
)

type CarouselService struct {
}

func (service *CarouselService) List(ctx context.Context) serializers.Response {
	code := e.Success
	carouselDao := dao.NewCarouselDao(ctx)

	carousels, err := carouselDao.ListCarousel()
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.BuildListResponse(serializers.BuildCarousels(carousels), uint(len(carousels)))
}
