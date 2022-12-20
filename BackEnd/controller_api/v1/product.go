package v1

import (
	util2 "example.com/mod/BackEnd/pkg/util"
	"example.com/mod/BackEnd/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

//Form结构由两个map组成，一个map中存放了所有的value part(就像前面的name、age)，
//另外一个map存放了所有的file part(就像前面的part1.txt、part2.png和part3.json)。
//value part集合没什么可说的，map的key就是每个值分段中的"name"；我们的重点在file part上。
//每个file part对应一组FileHeader
//https://blog.csdn.net/lengyue1084/article/details/114240430

//创建商品
func CreateProduct(c *gin.Context) {
	form, _ := c.MultipartForm() //ParseMultipartForm parses a request body as multipart/form-data.
	files := form.File["file"]   //解析之后获得"file"字段对应的一组文件？文件数组，把文件分离出来
	//A FileHeader describes a file part of a multipart request.
	claim, _ := util2.ParseToken(c.GetHeader("Authorization"))
	createProduct := service.ProductService{}

	if err := c.ShouldBind(&createProduct); err == nil {
		res := createProduct.CreateProduct(c.Request.Context(), claim.ID, files)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//获取商品列表
func ListProduct(c *gin.Context) {
	listProduct := service.ProductService{}

	if err := c.ShouldBind(&listProduct); err == nil {
		res := listProduct.List(c.Request.Context())
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//展示商品详情
func ShowProduct(c *gin.Context) {
	showProduct := service.ProductService{}

	if err := c.ShouldBind(&showProduct); err == nil {
		res := showProduct.Show(c.Request.Context(), c.Param("id")) //路径中的参数
		// Param returns the value of the URL param. It is a shortcut for c.Params.ByName(key)
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err)) //err需要处理成json，在common中
		util2.LogrusObj.Infoln(err)                       //????
	}
}

//搜索商品
func SearchProduct(c *gin.Context) {
	searchProductService := service.ProductService{}
	if err := c.ShouldBind(&searchProductService); err == nil {
		res := searchProductService.Search(c.Request.Context())
		c.JSON(http.StatusOK, res)
	} else {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		util2.LogrusObj.Infoln(err)
	}
}
