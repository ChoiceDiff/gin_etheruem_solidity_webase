package v1

import (
	util2 "example.com/mod/BackEnd/pkg/util"
	"example.com/mod/BackEnd/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

//加入购物车
func CreateOrder(c *gin.Context) {
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))
	createOrder := service.OrderService{}

	if err := c.ShouldBind(&createOrder); err == nil {
		res := createOrder.Create(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//获取购物车列表
func ShowListOrder(c *gin.Context) {
	listOrder := service.OrderService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&listOrder); err == nil {
		res := listOrder.GetList(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//ShowOrder
func ShowOrder(c *gin.Context) {
	showOrder := service.OrderService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&showOrder); err == nil {
		res := showOrder.Show(c.Request.Context(), claim.ID, c.Param("id")) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//移出购物车
func DeleteOrder(c *gin.Context) {
	deleteOrder := service.OrderService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&deleteOrder); err == nil {
		res := deleteOrder.Delete(c.Request.Context(), claim.ID, c.Param("id")) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}
