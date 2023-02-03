---
tags:
  - 编程语言
  - Go
---
协程
===

```text 
            +---------+
go 主线程 ---|  go协程  | --> 独立栈
            |  go协程  | --> 独立栈
            +---------+
```

* Golang协程是轻量级线程，调度由用户控制。
* 以主线程结束为准。
* 开启协程 `go <func>()`

## 调度模型
goroutine调度模型：MPG模式

* M：操作系统线程（物理级）
* P：协程执行所需上下文
* G：协程

## 常用函数
> 主要使用 `runtime` 包

* `runtime.GOMAXPROCS(n)`：设置最大CPU核数，go1.8后无需设置，默认多核运行
* `runtime.NumCPU()`：获取CPU核数

### 注意事项
* 小心协程并发竞争问题！在build时加 `-race` 参数可以观察竞争问题。

## goroutine通讯
* 写时加全局锁
* channel（管道）数据类型

### 管道channel
* 声明 `var <Name> chan <variType>`，初始化（make）后才可使用，是个指针
* 写入 `<chan> <- <value>`，value为字面量或变量
    * 写数据不可超过管道容量，否则会阻塞（deadlock）
* 读取 `<var> := <- <chan>`
    * 无协程时，不可从空channel读取数据，否则会阻塞（deadlock）
    
    !!! warning "注意"
        注意变量类型！接口值要使用类型断言。
* 关闭 `func close(c chan<-Type)`
    * 关闭时，`x,ok:=<-c`
### 注意事项
* 遍历管道要使用for-range，遍历前不关闭管道会死锁（deadlock）
* 管道可声明为只读或只写
    === "只写管道"
        ```go
        chan <- <Type>
        ```

    === "只读管道"
        ```go
        <- chan <Type>
        ```
* 解决管道取数据阻塞问题：select
    ```go 
    select {
        case v:= <channel-name1>:
          // do something
        case v:= <channel-name2>:
          // do something
        ...
        default:
          // do something
    } 
    ```
* 某个goroutine崩掉会导致整个程序崩溃，使用defer+recover解决
    ```go 
    defer func(){
      if err:=recover();err!=nil{...}
    }()
    ```