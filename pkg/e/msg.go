package e

var MsgFlags = map[int]string{
	Success:                    "OK",
	Error:                      "FAIL",
	InvalidParams:              "PARAMETERS ERROR",
	ErrorExistUser:             "User has existed",
	ErrorFailEncryption:        "Fail to encrypt password",
	ErrorExistUserNotFound:     "User is not exist",
	ErrorPassword:              "Wrong password",
	ErrorAuthorToken:           "Wrong Token",
	ErrorAuthCheckTokenTimeout: "Token expired",
	ErrorUploadFail:            "Fail to upload avatar",
	ErrorSendEmail:             "Fail to send email",
	ErrorProductImgUpload:      "Error to upload images",
	ErrorFavoriteExist:         "Favorite record has existed",
}

//GetMsg
func GetMsg(code int) string {
	msg, ok := MsgFlags[code]
	if !ok {
		return MsgFlags[Error]
	}
	return msg
}
