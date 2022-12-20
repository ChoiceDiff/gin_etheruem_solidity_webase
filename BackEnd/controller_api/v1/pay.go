package v1

import (
	util2 "example.com/mod/BackEnd/pkg/util"
	"example.com/mod/BackEnd/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func OrderPay(c *gin.Context) {
	orderPay := service.OrderPay{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&orderPay); err == nil {
		res := orderPay.PayDown(c.Request.Context(), claim.ID) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}
