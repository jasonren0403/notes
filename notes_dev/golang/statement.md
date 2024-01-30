---
tags:
    - 编程语言
    - Go
---

# Go 语句流程控制

## 顺序执行（默认）

无判断、无跳转，按顺序执行。

```go
func main(){
    fmt.Println("Hello World!") // |
    /* */                       // ↓
}
```

## 分支控制

### 单分支if

```go
if 条件表达式 { 执行代码块 }
```

-   支持在`if`中定义变量
    ```go
    if var:=/*...*/; var==... { 执行代码块 }
    ```
-   当然可以嵌套分支
    ```go
    if 条件表达式1 {
        /* ... */
        if 条件表达式2 { 执行代码块 }
        /* ... */
    }
    ```

### 双分支if-else

```go
if 条件表达式 {
  执行代码块1
} else {  // else 不能换行
  执行代码块2
}
```

### 多分支if-else if-else

```go
if 条件表达式1 {
  执行代码块1
} else if 条件表达式2 {  // else if 不能换行
  执行代码块2
} else {
  执行代码块3
}
```

!!! warning "注意！"
    如果条件相互重叠，只会执行最先满足的代码块。

### switch

!!! info ""
    Go 语言中，无需为匹配项指定 `break`。

```go
switch <可选表达式> { // 如果不填写表达式，则属于类if-else用法，这里也可以声明、定义变量，以分号结束
  case <表达式1>,...:
    <语句1>
    // fallthrough
    // 如果不加break，可以使用fallthrough强制执行后面的case，不推荐使用，可直接合并case
  case <表达式2>,...:
    <语句2>
  ...
  // 可选default
  default:
    <语句n>
}
```

!!! info "应用：type switch"
    ```go title="判断某个interface变量中实际指向的变量类型"
    var x interface{}
    var y = 10.0
    x=y
    switch x.(type) {
        case nil:
            fmt.Printf("x 的类型 :%T", x)
        case int:
            fmt.Printf("x 是 int 型")
        case float64:
            fmt.Printf("x 是 float64 型")
        case func(int) float64:
            fmt.Printf("x 是 func(int) 型")
        case bool, string:
            fmt.Printf("x 是 bool 或 string 型")
        default:
            fmt.Printf("未知型")
    }
    ```

## 循环控制

```go
for 初始化;循环条件;循环变量迭代{
  循环操作
}

// 无限循环
for ;; {
  循环操作
  [break]
}
// 或
for {
  循环操作
  [break]
}
```

-   初始化定义的变量作用域仅限于循环内部
-   循环条件需要返回布尔值
-   `while` 型循环等价
    ```go
    循环变量初始化
    for {
      if 循环条件表达式 {
        break
      }
      循环操作
      循环变量迭代
    }
    ```
-   `do-while` 型循环等价
    ```go
    for {
      循环操作
      循环变量迭代
      if 循环条件表达式 {
        break
      }
    }
    ```
-   遍历中文、字符串和数组：for-range

    ```go
    for index, val:= range var {
      循环操作
    }
    ```

    !!! info ""
        一个汉字对应了utf-8的三个字节，使用`for-range`遍历时，每次遍历的是一个字节，而不是一个汉字。

## 跳转控制

### break

-   `break` 语句用于跳出当前循环。
-   `break` 语句还可以在语句后面添加标签，表示退出某个标签对应的代码块。

### continue

-   `continue` 语句用于结束本次循环，继续执行下一次循环。
-   `continue` 语句还可以在语句后面添加标签，表示结束某个标签对应的循环。

### goto

-   `goto` 语句可以无条件地转移到过程中指定的行。

### return

-   函数中使用，不再执行函数中 `return` 后面的代码
-   `main` 函数 `return` 直接终止程序

## 错误处理机制：defer-panic-recover

默认情况下，发生错误触发 `panic`，程序就会退出。

```go
defer func(){
  err := recover()  // 内置函数，可以捕获到异常
  if err != nil {
    fmt.Println("err=", err)
    /* 然后发送给管理员... */
  }
}()
```

### 其它相关方法

-   自定义错误 `errors.New()`
-   `panic()` 接收 `error` 类型变量，输出错误信息并退出程序
