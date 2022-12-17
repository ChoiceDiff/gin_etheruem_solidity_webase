package e

//状态码
const (
	Success       = 200
	Error         = 500
	InvalidParams = 400

	//User
	ErrorExistUser             = 30001
	ErrorFailEncryption        = 30002
	ErrorExistUserNotFound     = 30003
	ErrorPassword              = 30004
	ErrorAuthorToken           = 30005
	ErrorAuthCheckTokenTimeout = 30006
	ErrorUploadFail            = 30007
	//Message
	ErrorSendEmail = 30008

	//Product
	ErrorProductImgUpload = 40001

	//Favorite
	ErrorFavoriteExist = 50001
)
