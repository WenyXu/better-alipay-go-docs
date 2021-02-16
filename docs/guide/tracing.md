---
id: tracing
title: 链路跟踪
sidebar_label: 链路跟踪

---

## 链路跟踪

你可以注入上下文 context，当你调用 Request func 的时候，并使用 hooks 去跟踪整个链路

```go
package main

import (
	"context"
	alipay "github.com/WenyXu/better-alipay-go"
	"github.com/WenyXu/better-alipay-go/options"
	"github.com/WenyXu/better-alipay-go/m"
	"github.com/opentracing/opentracing-go"
	"net/http"
)

func main() {
	s := alipay.Default()
	// 获取你的链路跟踪实例
	trace := yourTracingInstance()
	resp := make(map[string]interface{})
	s.Request("alipay.trade.create", m.NewMap(func(param m.M) {
		param.
			Set("subject", "网站测试支付").
			Set("buyer_id", "2088802095984694").
			Set("out_trade_no", "123456786543").
			Set("total_amount", "88.88")
	}),
	&resp,
    // 注入 链路上下文
	func(trace opentracing.Tracer) options.Option {
		return func(o *options.Options) {
			sp := opentracing.StartSpan("tarcing name")
			// 注入上下文 context
			o.Context = context.WithValue(o.Context,"span-key",sp)
		}
	}(trace),
	// 添加 接收到响应的钩子
	options.AppendAfterFunc(func(c context.Context, response *http.Response) context.Context {
            sp, ok := c.Get("span-key")
            if ok {
                // span 结束
                sp.Finish()
            }
		    return c
	    }),
	)

}
```
