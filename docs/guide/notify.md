---
id: notify
title: 处理通知
sidebar_label: 处理通知

---

```go
func ParseNotifyToStruct(reqOrValues interface{}, result interface{}) (err error)
```

```go
func ParseNotifyToMap(reqOrValues interface{}) (m _map.M, err error)
```

```go
func ParseNotifyByURLValues(value url.Values) (m _map.M, err error)
```

```go
//...
// req *http.Request
// values url.Values

_ := ParseNotifyToStruct(req,YourEntity)
_ := ParseNotifyToStruct(values,YourEntity)
result ,_ := ParseNotifyToMap(req)
result ,_ := ParseNotifyToMap(values)

//...
```