---
id: dynamic-configuration
title: 动态配置
sidebar_label: 动态配置

---

## 动态配置

如果你的应用有多个支付宝配置，你可以只创建单个客户端实例，使用动态的配置发起请求。

当你调用 Request 方法的时候，默认的会深拷贝当前配置 Options，然后再变更配置 Options。这是为了确保线程安全。


### 基础使用 

在每一个请求中设置你的支付宝配置
```go
package main
import (
    alipay "github.com/WenyXu/better-alipay-go"
    aliE "github.com/WenyXu/better-alipay-go/entity"
    "github.com/WenyXu/better-alipay-go/options"
    "github.com/WenyXu/better-alipay-go/global"
    "github.com/WenyXu/better-alipay-go/m"
    "os"
)
func main(){
	// init a default client with a app configuration
    // 初始化一个客户端（alipay.Default），包含主配置
    s := alipay.Default(
        options.AppId(os.Getenv("APP_ID")),
        options.PrivateKey(os.Getenv("PrivateKey")),
        options.AppCertPath("./cert_file/appCertPublicKey.crt"),
        options.RootCertPath("./cert_file/alipayRootCert.crt"),
        options.PublicCertPath("./cert_file/alipayCertPublicKey_RSA2.crt"),
        options.Production(false),
        options.PrivateKeyType(global.PKCS8),
        options.SignType(global.RSA2),
    )
	
    // var resp AliE.AlipayTradeCreateResponse
    resp := make(map[string]interface{})
	s.Request("alipay.trade.create",m.NewMap(func(param m.M) {
            param.
                Set("subject", "网站测试支付").
                Set("buyer_id", "2088802095984694").
                Set("out_trade_no", "123456786543").
                Set("total_amount", "88.88")
        }),
        &resp,
        // 动态的设置你的 App Auth Token / Auth Token
        options.AppAuthToken("your-app-auth-token"),
        options.AuthToken("your-auth-token"),
	)
}
```

### 进阶使用
使用配置方法，需实现 options.Option func
```go
    // 实现 options.Option func 类型
    // type Option func(*Options)
    func CustomOption(o *options.Options) {
        // 变更你的配置
        o.Config.AppId="whatever"
    }
    
    ...

    func main(){
        // 创建客户端使用 New / Default 方法
		s := alipay.Default(
			...,
        )
        //调用 Request of MakeParam func 
        s.Request("alipay.trade.create",m.NewMap(func(param m.M) {
              param.
              Set("subject", "网站测试支付").
              Set("buyer_id", "2088802095984694").
              Set("out_trade_no", "123456786543").
              Set("total_amount", "88.88")
          }),
          &resp,
          // 自定义 options.Option func
          CustomOption,
        )
    }   
    ...
    
    
```
使用一个没有默认配置的 Client ，在每一个请求中配置支付宝配置信息

```go
package main
import (
    alipay "github.com/WenyXu/better-alipay-go"
    "github.com/WenyXu/better-alipay-go/options"
    "github.com/WenyXu/better-alipay-go/global"
    "github.com/WenyXu/better-alipay-go/m"
)

func main(){
	// 初始化一个客户端，没有任何默认支付宝配置
    s := alipay.Default()
    
    // var resp AlipayTradeCreateResponse
    resp := make(map[string]interface{})
	s.Request("alipay.trade.create",m.NewMap(func(param m.M) {
		param.
			Set("subject", "网站测试支付").
			Set("buyer_id", "2088802095984694").
			Set("out_trade_no", "123456786543").
			Set("total_amount", "88.88")
	    }),
	    &resp,
	    // 动态配置
	    options.AppId(os.Getenv("APP_ID")),
	    options.PrivateKey(os.Getenv("PrivateKey")),
	    options.AppCertPath("./cert_file/appCertPublicKey.crt"),
            options.RootCertPath("./cert_file/alipayRootCert.crt"),
            options.PublicCertPath("./cert_file/alipayCertPublicKey_RSA2.crt"),
            options.Production(false),
            options.PrivateKeyType(global.PKCS8),
            options.SignType(global.RSA2),
	)
}

```
从数据库或者其他地方加载配置信息，在每一个请求中配置支付宝配置信息
```go
package main
import (
	alipay "github.com/WenyXu/better-alipay-go"
    aliE "github.com/WenyXu/better-alipay-go/entity"
	"github.com/WenyXu/better-alipay-go/options"
	"github.com/WenyXu/better-alipay-go/m"
)

func MakeAppConfig(yourConfig ConfigEntity) options.Option {
	return func(o *options.Options) {
		// 变动你的配置
		o.Config.AppId=yourConfig.AppId
		...
	}
}
func main()  {
	// 初始化一个客户端，没有任何默认支付宝配置
	s := alipay.Default()

	// 加载你的支付宝配置
	config:=ReadFormSomeWhere()
    
	// var resp AliE.AlipayTradeCreateResponse
	resp := make(map[string]interface{})
	s.Request("alipay.trade.create",m.NewMap(func(param m.M) {
              param.
                  Set("subject", "网站测试支付").
                  Set("buyer_id", "2088802095984694").
                  Set("out_trade_no", "123456786543").
                  Set("total_amount", "88.88")
	    }),
        &resp,
        // 动态地设置支付宝配置
        MakeAppConfig(config),
	)
    
}
```
