package main

import (
	"example.com/mod/conf"
	"example.com/mod/routers"
)

func main() {
	conf.Init()
	r := routers.NewRouter()
	_ = r.Run(conf.HttpPort)
	// Run attaches the router to a http.Server and starts listening and serving HTTP requests.
	// It is a shortcut for http.ListenAndServe(addr, router)
	// Note: this method will block the calling goroutine indefinitely unless an error happens.
}
