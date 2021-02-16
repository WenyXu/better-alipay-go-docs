---
id: qucikstart
title: 快速开始
sidebar_label: 快速开始
slug: /
---

## 安装
安装 Better-Alipay-Go 包，你需要安装 GO 和设置 GO 开发环境。
1. 首选你要确保你的 [Go](https://golang.org/) 已安装,使用以下命令来安装 Better-Alipay-GO 包
```sh
$ go get -u github.com/WenyXu/better-alipay-go
```
2. 在你的项目中引入:
```go
import "github.com/WenyXu/better-alipay-go"
```

## 第一个例子
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
	// 初始化一个带有默认配置的客户端
    s := alipay.Default(
        options.AppId(os.Getenv("APP_ID")),
        options.PrivateKey(os.Getenv("PrivateKey")),
        // 取决于你的 App Cert 证书类型
        // 如果你希望从 []byte 类型中加载你的证书文件
        // 可以使用：
        // options.AppCertBytes()
        // 如果你的证书文件已经保存为 SN 序列号
        // 可以使用：
        // options.AppCertSn()
        options.AppCertPath("./cert_file/appCertPublicKey.crt"),
        // 同上
        // 提供以下方法：
        // options.RootCertBytes()
        // options.RootCertSn()
        options.RootCertPath("./cert_file/alipayRootCert.crt"),
        // 同上
        // 提供以下方法：
        // options.PublicCertBytes()
        // options.PublicCertSn()
        options.PublicCertPath("./cert_file/alipayCertPublicKey_RSA2.crt"),
        // 设置沙箱/正式环境
        options.Production(false),
        // 配置私钥类型 global.PKCS1
        options.PrivateKeyType(global.PKCS8),
        // 配置签名类型 global.RSA
        options.SignType(global.RSA2),
    )
	
    // 使用内置的类型
    var resp AliE.AlipayTradeCreateResponse
    // 或者使用 map
    // resp := make(map[string]interface{})
    _ = s.Request("alipay.trade.create",m.NewMap(func(param m.M) {
          param.
              Set("subject", "网站测试支付").
              Set("buyer_id", "2088802095984694").
              Set("out_trade_no", "123456786543").
              Set("total_amount", "88.88"),
    }), &resp)

    // 发起没有 BizContent 的请求
    // https://opendocs.alipay.com/apis/api_9/alipay.system.oauth.token
    _ = s.Request(global.AlipaySystemOauthToken, m.NewMap(func(param m.M) {
        // set key value as public params 
    	param.
        	Set("grant_type", "authorization_code").
        	Set("code", "3a06216ac8f84b8c93507bb9774bWX11")
    }),
        &resp,
        // 配置 MakeReqFunc 为 options.WithoutBizContentMakeReqFunc
        // 将默认地把你传入的参数设置到公共请求参数中
        options.SetMakeReqFunc(options.WithoutBizContentMakeReqFunc),
    )
	
}
    
```

