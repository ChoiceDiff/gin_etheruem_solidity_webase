package v1

import (
	util2 "example.com/mod/BackEnd/pkg/util"
	"example.com/mod/BackEnd/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

//加入购物车
func CreateCart(c *gin.Context) {
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))
	createCart := service.CartService{}

	if err := c.ShouldBind(&createCart); err == nil {
		res := createCart.Create(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//获取购物车列表
func ShowListCart(c *gin.Context) {
	listCart := service.CartService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&listCart); err == nil {
		res := listCart.GetList(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//UpdateCart
func UpdateCart(c *gin.Context) {
	updateCart := service.CartService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&updateCart); err == nil {
		res := updateCart.Update(c.Request.Context(), claim.ID, c.Param("id")) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//移出购物车
func DeleteCart(c *gin.Context) {
	deleteCart := service.CartService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&deleteCart); err == nil {
		res := deleteCart.Delete(c.Request.Context(), claim.ID, c.Param("id")) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}
