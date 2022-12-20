package service

import (
	"context"
	"example.com/mod/BackEnd/dao"
	serializers2 "example.com/mod/BackEnd/serializers"
	"strconv"
)

type ListProductImg struct {
}

func (service *ListProductImg) List(ctx context.Context, pId string) serializers2.Response {
	productImgDao := dao.NewProductImgDao(ctx)
	productId, _ := strconv.Atoi(pId)
	productImgs, _ := productImgDao.ListProductImg(uint(productId))
	return serializers2.BuildListResponse(serializers2.BuildProductImgs(productImgs), uint(len(productImgs)))
}
