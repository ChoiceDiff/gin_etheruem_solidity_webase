package util

import (
	"github.com/sirupsen/logrus"
	"log"
	"os"
	"path"
	"time"
)

var LogrusObj *logrus.Logger //???go get github.com/sirupsen/logrus

func init() { //有变量需要初始化
	src, _ := setOutPutFile()
	if LogrusObj != nil {
		LogrusObj.Out = src
		return
	}
	//实例化
	logger := logrus.New()                     //Creates a new logger.
	logger.Out = src                           //设置输出目标文件
	logger.SetLevel(logrus.DebugLevel)         //设置日志级别？？？？
	logger.SetFormatter(&logrus.TextFormatter{ //TextFormatter formats logs into text
		//ForceColors:               false,
		//DisableColors:             false,
		//ForceQuote:                false,
		//DisableQuote:              false,
		//EnvironmentOverrideColors: false,
		//DisableTimestamp:          false,
		//FullTimestamp:             false,
		TimestampFormat: "2022-01-01 08:00:00",
		//DisableSorting:            false,
		//SortingFunc:               nil,
		//DisableLevelTruncation:    false,
		//PadLevelText:              false,
		//QuoteEmptyFields:          false,
		//FieldMap:                  nil,
		//CallerPrettyfier:          nil,
	})
	//logger.AddHook() ELK
	LogrusObj = logger
}

func setOutPutFile() (*os.File, error) { //按时间比如 日为单位 输出
	now := time.Now()
	logFilePath := ""
	// Getwd returns a rooted path name corresponding to the
	// current directory. If the current directory can be
	// reached via multiple paths (due to symbolic links),
	// Getwd may return any one of them.
	if dir, err := os.Getwd(); err == nil { //获取工作目录
		logFilePath = dir + "/logs/"
	}
	_, err := os.Stat(logFilePath)
	// Stat returns a FileInfo describing the named file.
	// If there is an error, it will be of type *PathError.

	// IsNotExist returns a boolean indicating whether the error is known to
	// report that a file or directory does not exist. It is satisfied by
	// ErrNotExist as well as some syscall errors.
	if os.IsNotExist(err) {
		if err = os.MkdirAll(logFilePath, 1000); err != nil {
			log.Println(err.Error()) //????
			return nil, err
		}
	}
	logFileName := now.Format("2006-01-02") + ".log"
	//日志文件
	fileName := path.Join(logFilePath, logFileName)
	_, err = os.Stat(fileName)
	if os.IsNotExist(err) {
		if err = os.MkdirAll(fileName, 1000); err != nil {
			log.Println(err.Error()) //????
			return nil, err
		}
	}
	//写入文件
	src, err := os.OpenFile(fileName, os.O_APPEND|os.O_WRONLY, os.ModeAppend) //return (*File, error)
	if err != nil {
		return nil, err
	}
	return src, nil
}
