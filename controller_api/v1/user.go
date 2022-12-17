package v1

import (
	"example.com/mod/pkg/util"
	"example.com/mod/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func UserRegister(c *gin.Context) {
	var userRegister service.UserService
	if err := c.ShouldBind(&userRegister); err == nil { //bind success
		res := userRegister.Register(c.Request.Context()) //处理方法,as the top-level Context for incoming requests.
		//Context returns the request's context.
		c.JSON(http.StatusOK, res) //const StatusOK int = 200
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util.LogrusObj.Infoln(err) //????
	}
}

func UserLogin(c *gin.Context) {
	var userLogin service.UserService
	if err := c.ShouldBind(&userLogin); err == nil { //bind success
		res := userLogin.Login(c.Request.Context()) //处理方法,as the top-level Context for incoming requests.
		//Context returns the request's context.
		c.JSON(http.StatusOK, res) //const StatusOK int = 200
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util.LogrusObj.Infoln(err) //????
	}
}

func UserUpdate(c *gin.Context) {
	var userUpdate service.UserService
	//get token
	claims, _ := util.ParseToken(c.GetHeader("Authorization")) //?
	if err := c.ShouldBind(&userUpdate); err == nil {          //bind success
		res := userUpdate.Update(c.Request.Context(), claims.ID) //处理方法,as the top-level Context for incoming requests.
		//Context returns the request's context.
		c.JSON(http.StatusOK, res) //const StatusOK int = 200
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util.LogrusObj.Infoln(err) //????
	}
}

func UploadAvatar(c *gin.Context) {
	file, fileHeader, _ := c.Request.FormFile("file")
	//FormFile returns the first file for the provided form key.
	fileSize := fileHeader.Size
	//A FileHeader describes a file part of a multipart request.
	var upLoadAvatar service.UserService

	claims, _ := util.ParseToken(c.GetHeader("Authorization")) //解析token，登录保护！！！！！！
	//没有token会出错

	if err := c.ShouldBind(&upLoadAvatar); err == nil { //bind success
		res := upLoadAvatar.Post(c.Request.Context(), claims.ID, file, fileSize) //处理方法,as the top-level Context for incoming requests.
		//Context returns the request's context.
		c.JSON(http.StatusOK, res) //const StatusOK int = 200
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util.LogrusObj.Infoln(err) //????
	}
}

func SendEmail(c *gin.Context) {
	var sendEmail service.SendEmailService
	claims, _ := util.ParseToken(c.GetHeader("Authorization")) //解析请求header里面的token，登录保护！！！！！！
	//没有token会出错

	if err := c.ShouldBind(&sendEmail); err == nil { //bind success
		res := sendEmail.SendEmail(c.Request.Context(), claims.ID) //处理方法,as the top-level Context for incoming requests.
		//Context returns the request's context.
		c.JSON(http.StatusOK, res) //const StatusOK int = 200
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util.LogrusObj.Infoln(err) //????
	}
}

//ValidEmail
func ValidEmail(c *gin.Context) {
	var validEmail service.ValidEmailService
	if err := c.ShouldBind(&validEmail); err == nil { //bind success
		res := validEmail.Valid(c.Request.Context(), c.GetHeader("Authorization")) //处理方法,as the top-level Context for incoming requests.
		//Context returns the request's context.
		c.JSON(http.StatusOK, res) //const StatusOK int = 200
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util.LogrusObj.Infoln(err) //????
	}
}

//显示金额
func DisplayAmount(c *gin.Context) {
	var displayAmount service.DisplayAmountService
	//判断登录状态
	claims, _ := util.ParseToken(c.GetHeader("Authorization")) //未初始化要加':'

	if err := c.ShouldBind(&displayAmount); err == nil { //bind success
		res := displayAmount.Display(c.Request.Context(), claims.ID) //处理方法,as the top-level Context for incoming requests.
		//Context returns the request's context.
		c.JSON(http.StatusOK, res) //const StatusOK int = 200
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util.LogrusObj.Infoln(err) //????
	}
}
