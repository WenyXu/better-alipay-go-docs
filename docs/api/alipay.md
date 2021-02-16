---
id: alipay
title: Alipay
sidebar_label: Alipay

---




## Default

```go
Default(opts ...options.Option) Service
```

```go

client := alipay.Default()

// same as 
c2 := alipay.New(append(
				[]Option{},
				DefaultLocation,
				DefaultCharset(),
				DefaultFormat(),
				DefaultVersion(),
				SetAfterFunc(DefaultAfterFunc),
				SetBeforeFunc(DefaultBeforeFunc),
				SetLogger(DefaultLogger),
        ))

//...
```

## New 

```go
func New(opts ...options.Option) Service
```

```go

client := alipay.New()

// Default config
// opt := Options{
//	    Transport: DefaultTransport,
//	    Context:   context.Background(),
//	    MakeReq:   DefaultMakeReqFunc,
//	    Dec:       DefaultDecFunc,
//	    Logger:    DefaultLogger,
//  }

//...
```
