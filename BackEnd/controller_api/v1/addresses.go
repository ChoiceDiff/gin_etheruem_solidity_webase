package v1

import (
	util2 "example.com/mod/BackEnd/pkg/util"
	"example.com/mod/BackEnd/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

//创建地址
func CreateAddress(c *gin.Context) {
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))
	createAddress := service.AddressService{}

	if err := c.ShouldBind(&createAddress); err == nil {
		res := createAddress.Create(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//展示对应一条地址
func GetAddress(c *gin.Context) {
	getAddress := service.AddressService{}

	if err := c.ShouldBind(&getAddress); err == nil {
		res := getAddress.GetOne(c.Request.Context(), c.Param("id")) //路径中的参数
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//获取全部地址列表
func GetListAddress(c *gin.Context) {
	listAddress := service.AddressService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&listAddress); err == nil {
		res := listAddress.GetList(c.Request.Context(), claim.ID)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//UpdateAddress
func UpdateAddress(c *gin.Context) {
	updateAddress := service.AddressService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&updateAddress); err == nil {
		res := updateAddress.Update(c.Request.Context(), claim.ID, c.Param("id")) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//删除地址
func DeleteAddress(c *gin.Context) {
	deleteAddress := service.AddressService{}
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))

	if err := c.ShouldBind(&deleteAddress); err == nil {
		res := deleteAddress.Delete(c.Request.Context(), claim.ID, c.Param("id")) //传入指定id的收藏夹
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}
