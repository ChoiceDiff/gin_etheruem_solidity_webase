package middleware

import (
	e2 "example.com/mod/BackEnd/pkg/e"
	"example.com/mod/BackEnd/pkg/util"
	"github.com/gin-gonic/gin"
	"time"
)

func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		var code int
		//var data interface{}
		code = 200
		token := c.GetHeader("Authorization") //token放在Authorization字段中!!!!!记得改名字！！！！！！！！！！！！！！！
		if token == "" {
			code = 404
		} else {
			claims, err := util.ParseToken(token)
			if err != nil {
				code = e2.ErrorAuthorToken
			} else if time.Now().Unix() > claims.ExpiresAt {
				code = e2.ErrorAuthCheckTokenTimeout
			}
		}
		if code != e2.Success {
			c.JSON(200, gin.H{
				"status": code,
				"msg":    e2.GetMsg(code),
			}) //H is a shortcut for map[string]interface{}
			c.Abort()
			return
		}
		c.Next() // Next should be used only inside middleware.
		// It executes the pending handlers in the chain inside the calling handler.
		// See example in GitHub.
	}
}
