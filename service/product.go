package service

import (
	"example.com/mod/dao"
	"example.com/mod/model"
	"example.com/mod/pkg/e"
	"example.com/mod/pkg/util"
	"example.com/mod/serializers"
	"golang.org/x/net/context"
	"mime/multipart"
	"strconv"
	"sync"
)

type ProductService struct {
	Name           string `json:"name" form:"name"`
	Category       uint   `json:"category" form:"category"`
	Title          string `json:"title" form:"title"`
	Info           string `json:"info" form:"info"`
	ImgPath        string `json:"img_path" form:"img_path"` //展示商品图片，选第一张
	Price          string `json:"price" form:"price"`
	DiscountPrice  string `json:"discount_price" form:"discount_price"`
	OnSale         bool   `json:"on_sale" form:"on_sale"`
	Num            int    `json:"num" form:"num"`
	model.BasePage        //分页
}

//createProduct
func (service *ProductService) CreateProduct(ctx context.Context, uId uint, files []*multipart.FileHeader) serializers.Response {
	var boss *model.User
	var err error
	code := e.Success
	userDao := dao.NewUserDao(ctx)
	boss, _ = userDao.GetUserById(uId)
	//以第一张图片为封面图
	tmp, _ := files[0].Open()                                       //Open opens and returns the FileHeader's associated File.
	path, err := UploadProductToLocalStatic(tmp, uId, service.Name) //封面图片，商家用户id，商品名字；返回封面图片路径
	if err != nil {
		code = e.ErrorProductImgUpload
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	product := &model.Product{
		Name:          service.Name,
		Category:      service.Category,
		Title:         service.Title,
		Info:          service.Info,
		ImgPath:       path,
		Price:         service.Price,
		DiscountPrice: service.DiscountPrice,
		OnSale:        true, //默认上架
		Num:           service.Num,
		BossId:        uId,
		BossName:      boss.UserName,
		BossAvatar:    boss.Avatar,
	} //里面包含model，里面有id
	productDao := dao.NewProductDao(ctx)
	err = productDao.CreateProduct(product)
	if err != nil {
		code = e.Error
		util.LogrusObj.Infoln(err) //打印日志
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	//并发上传商品图片，第一张图片被传了两次
	wg := new(sync.WaitGroup)
	wg.Add(len(files))
	for i, file := range files {
		num := strconv.Itoa(i)
		productImgDao := dao.NewProductImgDaoByDB(productDao.DB)
		tmp, _ = file.Open()
		path, err = UploadProductToLocalStatic(tmp, uId, service.Name+num) //+num用于区分多个图片，可以用随机字符串
		if err != nil {
			code = e.ErrorProductImgUpload
			util.LogrusObj.Infoln(err)
			return serializers.Response{
				Status: code,
				Msg:    e.GetMsg(code),
				Error:  err.Error(),
			}
		}
		productImg := model.ProductImg{
			ProductId: product.ID,
			ImgPath:   path,
		}
		err = productImgDao.CreateProductImg(&productImg)
		if err != nil {
			code = e.Error
			util.LogrusObj.Infoln(err)
			return serializers.Response{
				Status: code,
				Msg:    e.GetMsg(code),
				Error:  err.Error(),
			}
		}
		wg.Done()
	} //多个商品展示图
	wg.Wait()
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
		Data:   serializers.BuildProduct(product),
	}
}

//get product list
func (service *ProductService) List(ctx context.Context) serializers.Response {
	var products []model.Product
	var err error
	code := e.Success
	//每页的大小
	if service.PageSize == 0 {
		service.PageSize = 15
	}
	//查询条件，根据分类统计
	condition := make(map[string]interface{})
	if service.Category != 0 {
		condition["category"] = service.Category
	}
	productDao := dao.NewProductDao(ctx)
	total, err := productDao.CountProductByCondition(condition)
	if err != nil {
		code = e.Error
		util.LogrusObj.Infoln(err)
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	//并发
	wg := new(sync.WaitGroup)
	wg.Add(1)
	go func() {
		productDao = dao.NewProductDaoByDB(productDao.DB)
		products, _ = productDao.ListProductByCondition(condition, service.BasePage)
		wg.Done()
	}() //直接调用
	wg.Wait()
	//序列化商品列表
	return serializers.BuildListResponse(serializers.BuildProducts(products), uint(total))
}

//搜索商品
func (service *ProductService) Search(ctx context.Context) serializers.Response { //context.Context????
	code := e.Success
	if service.PageSize == 0 {
		service.PageSize = 15
	}
	productDao := dao.NewProductDao(ctx)
	products, count, err := productDao.SearchProduct(service.Info, service.BasePage) //搜索一般用ES
	if err != nil {
		code = e.Error
		util.LogrusObj.Infoln(err)
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	return serializers.BuildListResponse(serializers.BuildProducts(products), uint(count))
}

//展示商品详情
func (service *ProductService) Show(ctx context.Context, id string) serializers.Response {
	code := e.Success
	pId, _ := strconv.Atoi(id)
	productDao := dao.NewProductDao(ctx)
	product, err := productDao.GetProductById(uint(pId))
	//错误后面要处理
	if err != nil {
		code = e.Error
		util.LogrusObj.Infoln(err)
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
		Data:   serializers.BuildProduct(product),
	}
}
