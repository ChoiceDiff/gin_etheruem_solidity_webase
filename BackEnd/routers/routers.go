package routers

import (
	v12 "example.com/mod/BackEnd/controller_api/v1"
	middleware2 "example.com/mod/BackEnd/middleware"
	"github.com/gin-gonic/gin"
)

//中间件先于处理函数调用，字段名记得改！！！404在JWT中间件函数里！！！

import (
	"net/http"
)

func NewRouter() *gin.Engine {
	r := gin.Default()                          //创建gin实例
	r.Use(middleware2.Cors())                   //调用跨域中间件
	r.StaticFS("/static", http.Dir("./static")) //加载静态文件

	v1 := r.Group("api/v1") //路由分组
	// RouterGroup is used internally to configure router, a RouterGroup is associated with
	// a prefix and an array of handlers (middleware).
	{
		v1.GET("ping", func(c *gin.Context) { //类似请求报文？
			c.JSON(200, "success") //JSON serializes the given struct as JSON into the response body.
		})
		//user manipulation
		//register
		v1.POST("user/register", v12.UserRegister) //用户注册模块post->controller->service->response
		//login
		v1.POST("user/login", v12.UserLogin) //用户登录模块post->controller->service->response
		//carousels轮播图
		v1.GET("carousels", v12.ListCarousel)
		//商品查询等操作
		//获取商品列表
		v1.GET("products", v12.ListProduct)
		//showProduct
		v1.GET("products/:id", v12.ShowProduct)
		//showProductImgs
		v1.GET("imgs/:id", v12.ListProductImg)
		//商品分类
		v1.GET("categories", v12.ListCategory)

		authed := v1.Group("/")       //需要登录保护！！！！！！！！！！！！！！！
		authed.Use(middleware2.JWT()) //中间件，先于controller调用，有JWT中间件的服务需要token
		{
			//用户操作
			authed.PUT("user", v12.UserUpdate)
			authed.POST("avatar", v12.UploadAvatar) //post不具有幂等性
			//对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

			//验证流程：login->token->sending email with email-token->valid and update user information like email by according operation-type
			authed.POST("user/sending-email", v12.SendEmail) //send email
			authed.POST("user/valid-email", v12.ValidEmail)  //verify email

			//show money
			authed.POST("amount", v12.DisplayAmount)

			//商品操作
			authed.POST("product", v12.CreateProduct)
			authed.POST("search-product", v12.SearchProduct)

			//收藏夹操作
			authed.GET("favorites", v12.ListFavorite)
			authed.POST("favorites", v12.CreateFavorite)
			authed.DELETE("favorites/:id", v12.DeleteFavorite)
			//地址操作
			authed.POST("addresses", v12.CreateAddress)
			authed.GET("addresses/:id", v12.GetAddress)
			authed.GET("addresses", v12.GetListAddress)
			authed.PUT("addresses/:id", v12.UpdateAddress)
			authed.DELETE("addresses/:id", v12.DeleteAddress)
			//购物车操作
			authed.POST("carts", v12.CreateCart)
			authed.GET("carts", v12.ShowListCart)
			authed.PUT("carts/:id", v12.UpdateCart)
			authed.DELETE("carts/:id", v12.DeleteCart)
			//订单操作
			authed.POST("orders", v12.CreateOrder)
			authed.GET("orders", v12.ShowListOrder)
			authed.GET("orders/:id", v12.ShowOrder)
			authed.DELETE("orders/:id", v12.DeleteOrder)
			//支付模块
			authed.POST("paydown", v12.OrderPay)
		}
	}
	//业务流：项目到问题的抽象过程，提出问题；商品发布、订单生成、订单拆分、订单交易-》节点认证过程（小论文突出），发现问题和挑战-》
	//解决问题：现有的不足（文献阅读，研究现状），不适用于项目-》自己的思考，区块链设计适用于项目需要，具体的解决方法
	//从工程中发现问题，提出解决思路；同类型项目有可借鉴之处，项目的指导意义
	//大论文：分析，时序图，表结构；需要使用区块链技术的场景
	return r
}
