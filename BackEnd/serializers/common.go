package serializers

type Response struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
	Msg    string      `json:"msg"`
	Error  string      `json:"error"`
} //序列化器，类似写响应？

type TokenData struct {
	User  interface{} `json:"user"` //在Golang中,interface{}允许接纳任意值,类似于Java中的Object类型。
	Token string      `json:"token"`
}

//func (tokenData *TokenData) BuildUser(user *model.User) {
//	tokenData.User = user
//}
type DataList struct {
	Item  interface{} `json:"item"`
	Total uint        `json:"total"`
}

func BuildListResponse(items interface{}, total uint) Response { //返回一个列表数据（）
	return Response{
		Status: 200,
		Data: DataList{
			items,
			total,
		},
		Msg: "ok!",
	}
}
