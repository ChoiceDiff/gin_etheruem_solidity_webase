package routers

import (
	"example.com/mod/middleware"
	"github.com/gin-gonic/gin"
)

//中间件先于处理函数调用，字段名记得改！！！404在JWT中间件函数里！！！

import (
	controller_api "example.com/mod/controller_api/v1"
	"net/http"
)

func NewRouter() *gin.Engine {
	r := gin.Default()                          //创建gin实例
	r.Use(middleware.Cors())                    //调用跨域中间件
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
		v1.POST("user/register", controller_api.UserRegister) //用户注册模块post->controller->service->response
		//login
		v1.POST("user/login", controller_api.UserLogin) //用户登录模块post->controller->service->response
		//carousels轮播图
		v1.GET("carousels", controller_api.ListCarousel)
		//商品查询等操作
		//获取商品列表
		v1.GET("products", controller_api.ListProduct)
		//showProduct
		v1.GET("products/:id", controller_api.ShowProduct)
		//showProductImgs
		v1.GET("imgs/:id", controller_api.ListProductImg)
		//商品分类
		v1.GET("categories", controller_api.ListCategory)

		authed := v1.Group("/")      //需要登录保护！！！！！！！！！！！！！！！
		authed.Use(middleware.JWT()) //中间件，先于controller调用，有JWT中间件的服务需要token
		{
			//用户操作
			authed.PUT("user", controller_api.UserUpdate)
			authed.POST("avatar", controller_api.UploadAvatar) //post不具有幂等性
			//对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

			//验证流程：login->token->sending email with email-token->valid and update user information like email by according operation-type
			authed.POST("user/sending-email", controller_api.SendEmail) //send email
			authed.POST("user/valid-email", controller_api.ValidEmail)  //verify email

			//show money
			authed.POST("amount", controller_api.DisplayAmount)

			//商品操作
			authed.POST("product", controller_api.CreateProduct)
			authed.POST("search-product", controller_api.SearchProduct)

			//收藏夹操作
			authed.GET("favorites", controller_api.ListFavorite)
			authed.POST("favorites", controller_api.CreateFavorite)
			authed.DELETE("favorites/:id", controller_api.DeleteFavorite)
			//地址操作
			authed.POST("addresses", controller_api.CreateAddress)
			authed.GET("addresses/:id", controller_api.GetAddress)
			authed.GET("addresses", controller_api.GetListAddress)
			authed.PUT("addresses/:id", controller_api.UpdateAddress)
			authed.DELETE("addresses/:id", controller_api.DeleteAddress)
			//购物车操作
			authed.POST("carts", controller_api.CreateCart)
			authed.GET("carts", controller_api.ShowListCart)
			authed.PUT("carts/:id", controller_api.UpdateCart)
			authed.DELETE("carts/:id", controller_api.DeleteCart)
			//订单操作
			authed.POST("orders", controller_api.CreateOrder)
			authed.GET("orders", controller_api.ShowListOrder)
			authed.GET("orders/:id", controller_api.ShowOrder)
			authed.DELETE("orders/:id", controller_api.DeleteOrder)
			//支付模块
			authed.POST("paydown", controller_api.OrderPay)
		}
	}
	//业务流：项目到问题的抽象过程，提出问题；商品发布、订单生成、订单拆分、订单交易-》节点认证过程（小论文突出），发现问题和挑战-》
	//解决问题：现有的不足（文献阅读，研究现状），不适用于项目-》自己的思考，区块链设计适用于项目需要，具体的解决方法
	//从工程中发现问题，提出解决思路；同类型项目有可借鉴之处，项目的指导意义
	//大论文：分析，时序图，表结构；需要使用区块链技术的场景
	return r
}
