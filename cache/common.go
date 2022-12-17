package cache

import (
	"fmt"
	"github.com/go-redis/redis"
	"gopkg.in/ini.v1"
	"strconv"
)

//go get github.com/go-redis/redis
var (
	RedisClient *redis.Client
	RedisDb     string
	RedisDbName string
	RedisAddr   string
	RedisPwd    string
)

func init() {
	file, err := ini.Load("./conf/config.ini")
	if err != nil {
		fmt.Println("redis config error", err)
	}
	LoadRedisData(file) //读取配置文件
	Redis()
}

func LoadRedisData(file *ini.File) {
	//func (k *Key) String() string
	RedisDb = file.Section("redis").Key("RedisDb").String() //String returns string representation of value.
	RedisDbName = file.Section("redis").Key("RedisDbName").String()
	RedisAddr = file.Section("redis").Key("RedisAddr").String()
	RedisPwd = file.Section("redis").Key("RedisDbPw").String()
}

func Redis() { //连接redis
	db, _ := strconv.ParseUint(RedisDbName, 10, 64) //Package strconv implements conversions to and from string representations of basic data types.
	client := redis.NewClient(&redis.Options{       // NewClient returns a client to the Redis Server specified by Options.
		Addr: RedisAddr,
		//Password:
		DB: int(db),
	})
	_, err := client.Ping().Result()
	if err != nil {
		panic(err)
	}
	RedisClient = client
}
