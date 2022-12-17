package conf

import (
	"example.com/mod/dao"
	"gopkg.in/ini.v1"
	"strings"
)

var (
	AppMode  string //?
	HttpPort string

	DB         string
	DbHost     string
	DbPort     string
	DbUser     string
	DbPassword string
	DbName     string

	RedisDb     string
	RedisAddr   string
	RedisPw     string
	RedisDbName string

	ValidEmail string //?
	SmtpHost   string
	SmtpEmail  string
	SmtpPass   string

	Host        string //Avatar?
	ProductPath string //?
	AvatarPath  string //?

	Type   string
	CAFile string
	Cert   string
	Key    string

	NodeURL string
	GroupID string

	KeyFile string

	ChainID  string
	SMCrypto string
)

func Init() { //大写首字母为public
	//读取本地环境变量
	file, err := ini.Load("./conf/config.ini") //go mod tidy,./config.ini: The system cannot find the file specified.
	if err != nil {
		panic(err)
	}
	LoadServer(file)
	LoadDatabase(file)
	LoadRedis(file)
	LoadEmail(file)
	LoadPhotopath(file)
	//区块链配置
	LoadNetwork(file)
	LoadNetworkConnection(file)
	LoadAccount(file)
	LoadChain(file)

	//mysql 读（8）从
	pathRead := strings.Join([]string{DbUser, ":", DbPassword, "@tcp(", DbHost, ":", DbPort, ")/", DbName, "?charset=utf8mb4&parseTime=true"}, "") //sep?
	//mysql 写（2） 主
	pathWrite := strings.Join([]string{DbUser, ":", DbPassword, "@tcp(", DbHost, ":", DbPort, ")/", DbName, "?charset=utf8mb4&parseTime=true"}, "") //sep?
	dao.Database(pathRead, pathWrite)                                                                                                               //dao.init                                                                                                           //传入数组
}

func LoadServer(file *ini.File) {
	AppMode = file.Section("service").Key("AppMode").String()
	HttpPort = file.Section("service").Key("HttpPort").String() //注意字段名
}

func LoadDatabase(file *ini.File) {
	DB = file.Section("database").Key("DB").String()
	DbHost = file.Section("database").Key("DbHost").String()
	DbPort = file.Section("database").Key("DbPort").String()
	DbUser = file.Section("database").Key("DbUser").String()
	DbPassword = file.Section("database").Key("DbPassword").String()
	DbName = file.Section("database").Key("DbName").String()
}

func LoadRedis(file *ini.File) {
	RedisDb = file.Section("redis").Key("RedisDb").String()
	RedisAddr = file.Section("redis").Key("RedisAddr").String()
	RedisPw = file.Section("redis").Key("RedisPw").String()
	RedisDbName = file.Section("redis").Key("RedisDbName").String()
}

func LoadEmail(file *ini.File) {
	ValidEmail = file.Section("email").Key("ValidEmail").String() //字段名错则，未读取到
	SmtpHost = file.Section("email").Key("SmtpHost").String()
	SmtpEmail = file.Section("email").Key("SmtpEmail").String()
	SmtpPass = file.Section("email").Key("SmtpPass").String()
}

func LoadPhotopath(file *ini.File) {
	Host = file.Section("path").Key("Host").String()
	ProductPath = file.Section("path").Key("ProductPath").String()
	AvatarPath = file.Section("path").Key("AvatarPath").String()
}

func LoadNetwork(file *ini.File) {
	Type = file.Section("network").Key("Type").String()
	CAFile = file.Section("network").Key("CAFile").String()
	Cert = file.Section("network").Key("Cert").String()
	Key = file.Section("network").Key("Key").String()
}

func LoadNetworkConnection(file *ini.File) {
	NodeURL = file.Section("networkConnection").Key("NodeURL").String()
	GroupID = file.Section("networkConnection").Key("GroupID").String()
}

func LoadAccount(file *ini.File) {
	KeyFile = file.Section("account").Key("KeyFile").String()
}

func LoadChain(file *ini.File) {
	ChainID = file.Section("chain").Key("ChainID").String()
	SMCrypto = file.Section("chain").Key("SMCrypto").String()
}
