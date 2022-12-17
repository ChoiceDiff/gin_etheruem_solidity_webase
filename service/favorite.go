package service

import (
	"context"
	"example.com/mod/dao"
	"example.com/mod/model"
	"example.com/mod/pkg/e"
	"example.com/mod/pkg/util"
	"example.com/mod/serializers"
	"strconv"
)

//service里面写调用服务需要的参数，serializers里面写需要返回的数据
type FavoriteService struct {
	ProductId  uint `json:"product_id" form:"product_id"`
	BossId     uint `json:"boss_id" form:"boss_id"`
	FavoriteId uint `json:"favorite_id" form:"favorite_id"`
	model.BasePage
}

//显示收藏夹列表
func (service *FavoriteService) List(ctx context.Context, uId uint) serializers.Response {
	code := e.Success
	favoriteDao := dao.NewFavoriteDao(ctx)
	favorite, err := favoriteDao.ListFavorite(uId)
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.BuildListResponse(serializers.BuildFavorites(ctx, favorite), uint(len(favorite)))
}

//创建收藏夹记录
func (service *FavoriteService) Create(ctx context.Context, uId uint) serializers.Response {
	code := e.Success
	favoriteDao := dao.NewFavoriteDao(ctx)
	exist, _ := favoriteDao.FavoriteExistOrNot(service.ProductId, uId) //通过proId和UID判断这条收藏记录是否存在
	if exist {
		code = e.ErrorFavoriteExist
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	//查找是否存在用户、商品、老板
	userDao := dao.NewUserDao(ctx) //此处好像有些重复，若用户不存在似乎也不能登录和生成token，而uId由token解析而来
	user, err := userDao.GetUserById(uId)
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	bossDao := dao.NewUserDao(ctx) //此处好像有些重复，若用户不存在似乎也不能登录和生成token，而uId由token解析而来
	boss, err := bossDao.GetUserById(service.BossId)
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	productDao := dao.NewProductDao(ctx) //此处好像有些重复，若用户不存在似乎也不能登录和生成token，而uId由token解析而来
	product, err := productDao.GetProductById(service.ProductId)
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}

	favorite := &model.Favorite{
		User:      *user, //注意类型！！！
		UserId:    uId,
		Product:   *product, //注意类型！！！
		ProductId: service.ProductId,
		Boss:      *boss,
		BossId:    service.BossId,
	}

	err = favoriteDao.CreateFavorite(favorite)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
	}
}

//删除收藏夹记录
func (service *FavoriteService) Delete(ctx context.Context, uId uint, fId string) serializers.Response {
	code := e.Success
	favoriteDao := dao.NewFavoriteDao(ctx)
	fIdNum, _ := strconv.Atoi(fId)                             //注意参数个数                                           //
	err := favoriteDao.Delete(service.ProductId, uint(fIdNum)) //通过proId和UID判断这条收藏记录是否存在
	if err != nil {
		util.LogrusObj.Infoln("err", err) //引入日志
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
	}
}
