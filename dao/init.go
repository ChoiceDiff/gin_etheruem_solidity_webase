package dao

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"gorm.io/plugin/dbresolver"
	"time"
)

var _db *gorm.DB

func Database(connRead, connWrite string) {
	var ormLogger logger.Interface
	if gin.Mode() == "debug" {
		ormLogger = logger.Default.LogMode(logger.Info)
	} else {
		ormLogger = logger.Default //offline
	}

	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN:                       connRead, //主数据库
		DefaultStringSize:         256,      // string 类型字段默认长度
		DisableDatetimePrecision:  true,     //禁止datatime精度，mysql 5.6之前不支持
		DontSupportRenameIndex:    true,
		DontSupportRenameColumn:   true,  //?
		SkipInitializeWithVersion: false, //?
	}), &gorm.Config{
		Logger: ormLogger,
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	}) //mysql configuration
	if err != nil {
		return
	}
	sqlDB, _ := db.DB()                        //return *sql.DB
	sqlDB.SetMaxOpenConns(20)                  //数据库最大同时打开链接数
	sqlDB.SetMaxIdleConns(100)                 //最大连接数
	sqlDB.SetConnMaxLifetime(time.Second * 30) //连接最大生存时间

	_db = db
	//主从配置
	_ = _db.Use(dbresolver.Register(dbresolver.Config{
		Sources:  []gorm.Dialector{mysql.Open(connWrite)},                      //write
		Replicas: []gorm.Dialector{mysql.Open(connRead), mysql.Open(connRead)}, //read 2dbs
		Policy:   dbresolver.RandomPolicy{},                                    //负载均衡
	}))
	migration() //数据库迁移?
}

func NEWDBClient(ctx context.Context) *gorm.DB {
	db := _db
	return db.WithContext(ctx) //WithContext change current instance db's context to ctx(recent request context)
}
