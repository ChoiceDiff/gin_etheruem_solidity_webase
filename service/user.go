package service

import (
	"example.com/mod/conf"
	"example.com/mod/dao"
	"example.com/mod/model"
	"example.com/mod/pkg/e"
	"example.com/mod/pkg/util"
	"example.com/mod/serializers"
	"golang.org/x/net/context"
	"gopkg.in/mail.v2"
	"mime/multipart"
	"strings"
	"time"
)

type UserService struct {
	NickName string `json:"nick_name" form:"nick_name"` //form?
	UserName string `json:"user_name" form:"user_name"`
	Password string `json:"password" form:"password"`
	Key      string `json:"key" form:"key"` //加密秘钥，前端验证
}

type SendEmailService struct {
	Email         string `json:"email" form:"email"`
	Password      string `json:"password" form:"password"`
	OperationType uint   `json:"operation_type" form:"operation_type"`
	//1.bind email 2.unbind email 3.change password
}

type ValidEmailService struct {
}

type DisplayAmountService struct {
	Key string `json:"key" form:"key"`
}

////////////////////////////////////////////////////////////////////////

func (service *UserService) Register(ctx context.Context) serializers.Response {
	var user model.User
	code := e.Success
	if service.Key == "" || len(service.Key) != 16 {
		code := e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  "Length of key is invalid!",
		}
	}
	//配置加密，对称加密金额
	util.Encrypt.SetKey(service.Key)

	//dao层
	userDao := dao.NewUserDao(ctx) //ctx request context
	_, exist, err := userDao.ExistOrNotByUserName(service.UserName)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	if exist {
		code = e.ErrorExistUser
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}

	user = model.User{ //new user
		UserName: service.UserName,
		Email:    "",
		NickName: service.NickName,
		Status:   model.Active,
		Avatar:   "avatar1.png",                     //默认头像？
		Money:    util.Encrypt.AesEncoding("10000"), //初始金额加密
	}

	//密码加密，复杂的：前端传密文，后端解密
	if err = user.SetPassword(service.Password); err != nil { //model.user
		code = e.ErrorFailEncryption
	}

	//CreateUser
	err = userDao.CreateUser(&user) //传指针减少拷贝,数据库操作都在dao
	// Create inserts value, returning the inserted data's primary key in value's id

	if err != nil {
		code = e.Error
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
	}
} //接收器函数

func (service *UserService) Login(ctx context.Context) serializers.Response {
	var user *model.User
	code := e.Success
	userDao := dao.NewUserDao(ctx) //创建dao，经过初始化配置和ctx

	user, exist, err := userDao.ExistOrNotByUserName(service.UserName) //看看用户是否存在
	if !exist || err != nil {
		code = e.ErrorExistUserNotFound
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Data:   "用户不存在，请先注册！！！",
		}
	}
	//检查密码
	if user.CheckPassword(service.Password) == false {
		code = e.ErrorPassword
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Data:   "密码错误，请重新输入！！！",
		}
	}
	//http无状态，token签发
	token, err := util.GenerateToken(user.ID, user.UserName, 0) //commonUser 0
	if err != nil {
		code = e.ErrorAuthorToken
	}

	return serializers.Response{
		Status: code,
		Data:   serializers.TokenData{User: serializers.BuildUser(user), Token: token}, //返回带有token的响应结构体
		Msg:    e.GetMsg(code),
	}
}

func (service *UserService) Update(ctx context.Context, uID uint) serializers.Response {
	var user *model.User
	var err error
	code := e.Success
	//找到用户
	userDao := dao.NewUserDao(ctx)
	user, err = userDao.GetUserById(uID)
	//通过id修改昵称
	if service.NickName != "" {
		user.NickName = service.NickName
	}
	err = userDao.UpdateUserById(uID, user)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
		Data:   serializers.BuildUser(user),
	}
} //依靠状态码控制响应报文

//Post 头像更新
func (service *UserService) Post(ctx context.Context, uID uint, file multipart.File, fileSize int64) serializers.Response {
	code := e.Success
	var user *model.User
	var err error
	userDao := dao.NewUserDao(ctx)
	user, err = userDao.GetUserById(uID)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	//save avatar to local
	path, err := UploadAvatarToLocalStatic(file, uID, user.UserName) //唯一标识用户头像
	if err != nil {
		code = e.ErrorUploadFail
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	user.Avatar = path
	err = userDao.UpdateUserById(uID, user)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
		Data:   serializers.BuildUser(user),
	}
}

//send email
func (service *SendEmailService) SendEmail(ctx context.Context, uId uint) serializers.Response {
	code := e.Success
	var address string
	var notice *model.Notice                                                                           //邮件通知模板
	token, err := util.GenerateEmailToken(uId, service.OperationType, service.Email, service.Password) //传入负载内容
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	noticeDao := dao.NewNoticeDao(ctx)
	notice, err = noticeDao.GetNoticeById(service.OperationType) //Get Notice By OperationType
	if err != nil {
		code = e.ErrorAuthorToken
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	address = conf.ValidEmail + token //邮件里面的链接
	mailStr := notice.Text            //说明
	// mailText := mailStr + address
	mailText := strings.Replace(mailStr, "Email", address, -1) //字段名错则，未读取到
	m := mail.NewMessage()
	//NewMessage creates a new message. It uses UTF-8 and quoted-printable encoding
	// by default.

	//https://zhuanlan.zhihu.com/p/403510053
	m.SetHeader("From", conf.SmtpEmail)
	m.SetHeader("To", service.Email)
	m.SetHeader("Subject", "Orange")
	m.SetBody("text/html", mailText)

	d := mail.NewDialer(conf.SmtpHost, 465, conf.SmtpEmail, conf.SmtpPass)
	// smtp服务host
	//var port = 465                  // ssl端口
	//conf.SmtpEmail // 发送方邮箱
	//var pass = "top1studiomail"     // 授权码
	d.StartTLSPolicy = mail.MandatoryStartTLS
	//STARTTLS，是一种明文通信协议的扩展，能够让明文的通信连线直接成为加密连线（使用SSL或TLS加密），
	//而不需要使用另一个特别的端口来进行加密通信，属于机会性加密。
	if err = d.DialAndSend(m); err != nil {
		code = e.ErrorSendEmail
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
			Error:  err.Error(),
		}
	}
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
	}
}

//verify email
func (service *ValidEmailService) Valid(ctx context.Context, token string) serializers.Response {
	var userId uint
	var email string
	var password string
	var operationType uint
	code := e.Success
	//验证token
	if token == "" {
		code = e.InvalidParams
	} else {
		claims, err := util.ParseEmailToken(token)
		if err != nil {
			code = e.ErrorAuthorToken
		} else if time.Now().Unix() > claims.ExpiresAt {
			// Unix returns t as a Unix time, the number of seconds elapsed
			// since January 1, 1970 UTC. The result does not depend on the
			// location associated with t.
			code = e.ErrorAuthCheckTokenTimeout
		} else {
			userId = claims.UserId
			email = claims.Email
			password = claims.Password
			operationType = claims.OperationType
		}
	}
	if code != e.Success {
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	//获取用户信息
	userDao := dao.NewUserDao(ctx)
	user, err := userDao.GetUserById(userId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	//根据操作类型判断,可以用switch-case
	if operationType == 1 { //bind email
		user.Email = email
	} else if operationType == 2 { //unbind email
		user.Email = ""
	} else if operationType == 3 { //change password
		err = user.SetPassword(password)
		if err != nil {
			code = e.Error
			return serializers.Response{
				Status: code,
				Msg:    e.GetMsg(code),
			}
		}
	}

	//update user information
	err = userDao.UpdateUserById(userId, user)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	//return user information
	return serializers.Response{
		Status: code,
		Msg:    e.GetMsg(code),
		Data:   serializers.BuildUser(user),
	}
}

//display amount
func (service *DisplayAmountService) Display(ctx context.Context, userId uint) serializers.Response {
	code := e.Success

	userDao := dao.NewUserDao(ctx)
	user, err := userDao.GetUserById(userId)
	if err != nil {
		code = e.Error
		return serializers.Response{
			Status: code,
			Msg:    e.GetMsg(code),
		}
	}
	return serializers.Response{
		Status: code,
		Data:   serializers.BuildAmount(user, service.Key),
		Msg:    e.GetMsg(code),
	}
}

//var amount uint64
//code := e.Success
//
//userDao := dao.NewUserDao(ctx)
//user, err := userDao.GetUserById(userId)
//if err != nil {
//	code = e.Error
//	return serializers.Response{
//		Status: code,
//		Msg:    e.GetMsg(code),
//	}
//}
//encryMoney := &util.Encryption{Key: user.Money}
//amountFromDigest := encryMoney.AesDecoding(encryMoney.Key)
//amount, err = strconv.ParseUint(amountFromDigest, 10, 64)
//if err != nil {
//	code = e.Error
//	return serializers.Response{
//		Status: code,
//		Msg:    e.GetMsg(code),
//	}
//}
//return serializers.Response{
//	Status: code,
//	Msg:    e.GetMsg(code),
//	Data:   amount,
//}
