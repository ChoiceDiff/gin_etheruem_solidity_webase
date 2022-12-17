package service

import (
	"example.com/mod/conf"
	"io/ioutil"
	"mime/multipart"
	"os"
	"strconv"
)

//用于上传

func UploadAvatarToLocalStatic(file multipart.File, uid uint, userName string) (filePath string, err error) {
	bId := strconv.Itoa(int(uid))                          //路径拼接
	basePath := "." + conf.AvatarPath + "user" + bId + "/" //相对路径,todo: 把 file 的后缀提取出来
	if !DirExistOrNot(basePath) {
		CreateDir(basePath)
	}
	avatarPath := basePath + userName + ".png"
	content, err := ioutil.ReadAll(file) //把文件写入content
	//func ReadAll(r io.Reader) ([]byte, error) {
	//	return io.ReadAll(r)
	//}
	if err != nil {
		return "", nil
	}
	err = ioutil.WriteFile(avatarPath, content, 1000)
	// WriteFile writes data to a file named by filename.
	// If the file does not exist, WriteFile creates it with permissions perm
	// (before umask); otherwise WriteFile truncates it before writing, without changing permissions.
	if err != nil {
		return
	}
	return "user" + bId + "/" + userName + ".png", nil //返回专属路径
}

//path不存在则创建
func DirExistOrNot(fileAddr string) bool {
	s, err := os.Stat(fileAddr)
	// Stat returns a FileInfo describing the named file.
	// If there is an error, it will be of type *PathError.
	if err != nil {
		return false
	}
	return s.IsDir()
	// IsDir reports whether the entry describes a directory.
}

//创建文件夹
func CreateDir(dirName string) bool {
	err := os.MkdirAll(dirName, 1000) //?
	if err != nil {
		return false
	}
	return true
}

// MkdirAll creates a directory named path,
// along with any necessary parents, and returns nil,
// or else returns an error.
// The permission bits perm (before umask) are used for all
// directories that MkdirAll creates.
// If path is already a directory, MkdirAll does nothing
// and returns nil.

//更新商品信息
func UploadProductToLocalStatic(file multipart.File, uid uint, productName string) (filePath string, err error) {
	bId := strconv.Itoa(int(uid))                           //路径拼接
	basePath := "." + conf.ProductPath + "boss" + bId + "/" //相对路径,todo: 把 file 的后缀提取出来
	if !DirExistOrNot(basePath) {
		CreateDir(basePath)
	}
	productPath := basePath + productName + ".png"
	content, err := ioutil.ReadAll(file) //把文件写入content
	//func ReadAll(r io.Reader) ([]byte, error) {
	//	return io.ReadAll(r)
	//}
	if err != nil {
		return "", nil
	}
	err = ioutil.WriteFile(productPath, content, 1000)
	// WriteFile writes data to a file named by filename.
	// If the file does not exist, WriteFile creates it with permissions perm
	// (before umask); otherwise WriteFile truncates it before writing, without changing permissions.
	if err != nil {
		return
	}
	return "boss" + bId + "/" + productName + ".png", nil //返回专属路径
}
