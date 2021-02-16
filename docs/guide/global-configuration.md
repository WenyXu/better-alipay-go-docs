---
id: global-configuration
title: 全局配置
sidebar_label: 全局配置

---

## 全局配置

你可以使用下列方法设置客户端的全局配置

```go
package main

import (
	"github.com/WenyXu/better-alipay-go/options"
	"time"
)

func main() {
    // 设置默认时区
	loc, err := time.LoadLocation("Asia/Shanghai")
	if err != nil {
		panic(err)
	}
	options.SetDefaultLocation(options.SetLocation(loc))

	// 设置默认 Transport
	// 实现了 http.RoundTripper interface 的 Transport
	transport := YourCustomTransport()
	options.SetDefaultTransport(transport)

	// 设置构建请求的方法 MakeRequestFunc
    // 需实现 options.MakeRequestFunc func 
	options.SetDefaultMakeReqFunc(yourMakeReqFunc)

	// 设置默认的 DecFunc 
    // 需实现 options.DecFunc func
	options.SetDefaultDecFunc(yourDecFunc)
	
	// 设置默认的 Logger 
    // 需实现 logger.Logger interface 
	// 内建的 :
	// logger.NullLogger
	// logger.StdLogger
	options.SetDefaultLogger(yourLogger)
}

```

经过以上配置后，alipay.New / alipay.Default 方法会返回你的全局配置

```go
// options.go 
func newOptions(opts ...Option) Options {
	opt := Options{
		Transport: DefaultTransport,
		Context:   context.Background(),
		MakeReq:   DefaultMakeReqFunc,
		Dec:       DefaultDecFunc,
		Logger:    DefaultLogger,
	}
	for _, o := range opts {
		o(&opt)
	}
	return opt
}
```
