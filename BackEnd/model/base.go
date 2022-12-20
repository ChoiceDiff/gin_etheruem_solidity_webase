package model

type BasePage struct {
	PageNum  int `form:"page_num"`
	PageSize int `form:"page_size"` //form与postman请求的参数格式有关
}
