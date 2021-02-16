---
id: hooks
title: 钩子 Hooks
sidebar_label: 钩子 Hooks

---

## Hooks
我们提供两各类型钩子 Hooks，分别是请求发起前的钩子 BeforeFunc，和接收到响应后的钩子 AfterFunc，所以你可以在上下文中注入链路跟踪的 Span 或者其他内容。有点类似 Web 中间件。
这里我们给到一个例子，帮助你构建概念。

```go
// options.go
// 默认的请求发起前钩子： 打印请求信息 Body
func DefaultBeforeFunc(ctx context.Context, req *http.Request) context.Context {
    body, err := ioutil.ReadAll(req.Body)
    if err != nil {
        fmt.Printf("Read Request body with error: %s", err.Error())
        return ctx
    }
    req.Body = ioutil.NopCloser(bytes.NewBuffer(body))
    fmt.Println(string(body))
    return ctx
}

// 默认的接收到响应后的钩子： 打印响应信息 Body
func DefaultAfterFunc(ctx context.Context, resp *http.Response) context.Context {
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Printf("Read Response body with error: %s", err.Error())
        return ctx
    }
    resp.Body = ioutil.NopCloser(bytes.NewBuffer(body))
    fmt.Println(string(body))
    return ctx
}

```

在 Request 方法总，请求发起前钩子 会在请求构建完成后调用，接收到响应后的钩子 会在响应接收到后调用

```go
//alipay.go
// Do Request
func (s service) Request(method string, param m.M, response interface{}, opts ...options.Option) (err error) {
    copyOpts := s.opts.Copy()
    
    ...
    
    // run before hooks before request started
    for _, f := range copyOpts.Before {
        ctx = f(ctx, req)
    }
    
    ...
    
    // do request
    resp, err := copyOpts.Transport.RoundTrip(req)
    
    
    ...
    
    // run after hooks after response received
    for _, f := range copyOpts.After {
        ctx = f(ctx, resp)
    }
    
    ...
}

```
