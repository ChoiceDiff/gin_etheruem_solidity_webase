package v1

import (
	"example.com/mod/pkg/util"
	"example.com/mod/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

//创建收藏夹
func CreateFavorite(c *gin.Context) {
	claim, _ := util.ParseToken(c.GetHeader("Authorization"))
	createFavorite := service.FavoriteService{}

	if err := c.ShouldBind(&createFavorite); err == nil {
		res := createFavorite.Create(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util.LogrusObj.Infoln(err)                        //????
	}
}

//获取商品列表
func ListFavorite(c *gin.Context) {
	listFavorite := service.FavoriteService{}
	claim, _ := util.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&listFavorite); err == nil {
		res := listFavorite.List(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util.LogrusObj.Infoln(err)                        //????
	}
}

//删除收藏记录
func DeleteFavorite(c *gin.Context) {
	deleteFavorite := service.FavoriteService{}
	claim, _ := util.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&deleteFavorite); err == nil {
		res := deleteFavorite.Delete(c.Request.Context(), claim.ID, c.Param("id")) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util.LogrusObj.Infoln(err)                        //????
	}
}
