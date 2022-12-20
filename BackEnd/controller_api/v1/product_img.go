package v1

import (
	"example.com/mod/BackEnd/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ListProductImg(c *gin.Context) {
	var listProductImg service.ListProductImg
	if err := c.ShouldBind(&listProductImg); err == nil {
		res := listProductImg.List(c.Request.Context(), c.Param("id")) //带参数的要加上
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
	}
}
