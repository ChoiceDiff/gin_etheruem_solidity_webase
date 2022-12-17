package v1

import (
	"encoding/json"
	"example.com/mod/serializers"
)

func ErrorResponse(err error) serializers.Response {
	// An UnmarshalTypeError describes a JSON value that was
	// not appropriate for a value of a specific Go type.
	if _, ok := err.(*json.UnmarshalTypeError); ok { //package json
		// 类型断言https://blog.csdn.net/raoxiaoya/article/details/115131883
		//成功则返回该值和true，失败则返回断言类型的零值,结果:false

		//interface{}类型类似于c语言中的void *类型，可以接受任意类型的参数
		return serializers.Response{
			Status: 400,
			Msg:    "JSON类型不匹配",
			Error:  err.Error(),
		}
	}
	return serializers.Response{
		Status: 400,
		Msg:    "参数错误",
		Error:  err.Error(),
	}
}
