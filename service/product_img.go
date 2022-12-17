package service

import (
	"context"
	"example.com/mod/dao"
	"example.com/mod/serializers"
	"strconv"
)

type ListProductImg struct {
}

func (service *ListProductImg) List(ctx context.Context, pId string) serializers.Response {
	productImgDao := dao.NewProductImgDao(ctx)
	productId, _ := strconv.Atoi(pId)
	productImgs, _ := productImgDao.ListProductImg(uint(productId))
	return serializers.BuildListResponse(serializers.BuildProductImgs(productImgs), uint(len(productImgs)))
}
