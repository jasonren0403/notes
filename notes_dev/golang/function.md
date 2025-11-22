# Go 函数

## 函数定义

```go
func 函数名(形参列表) (返回值列表) {
    函数体
}
```

-   函数分为自定义函数和系统函数
-   形参列表中，每一项的格式为：`参数名 参数类型`

### init 函数

在 `main()` 执行前先执行，通常完成初始化工作

!!! info ""
    * 被引入包的 `init()` 先执行
    ```mermaid 
    graph LR
    A[全局变量定义] --> C["init()"] --> B["main()"]
    ```

### 匿名函数

!!! summary "意义"
    某个函数只希望调用一次

-   定义时直接调用：`<var> := func(形参) 返回类型 {...}(要传的实参)`
-   赋给一个变量，通过变量调用
    ```go
    var := func(形参) 返回类型 {...}
    res := <var>(实参) // 注意，var不是函数名
    ```

#### 全局匿名函数

=== "声明"
    ```go 
    var(
      Fun1 = func(n1 int, n2 int) int{
        return n1 * n2
      }
    )
    ```

=== "调用"
    ```go
    res := Fun1(4, 9)
    ```

### 闭包

函数+相关引用环境

```go
func xx() func (形参) 返回值 {
  /* ... 引用 */
  return func (形参) 返回值 {
    /* ... */
    return () // 其中包含外层引用部分
  }
}
```

### 注意事项

-   函数中的变量是局部的，函数外不生效
-   基本数据类型和数组默认为值传递，函数内修改不影响外部
    -   想修改，传变量地址 &
-   Go 无函数重载，但有替代机制
-   函数也是数据类型，也可以作为形参并且调用
-   支持对函数返回值命名
    ```go
    func cal(n1 int, n2 int) (sum int, sub int) {
        ...
    }
    ```
-   `_` 标识符可以忽略单个返回值
-   可变参数 `func xxx(args... int) sum int {/*...*/}`
    -   本质为slice切片（动态数组）

## 包

!!! info "包的意义"
    1. 调用其他文件定义的函数
    2. 方便管理
    3. 控制变量、函数访问范围

> 本质：不同文件夹，存放程序文件

-   打包：`package <包名>`，一般与文件夹名保持一致，该语句在文件第一行
-   导入包：`import "包路径"`，从GOPATH（`src`文件夹下，不包含 `src` 本身）开始找
    ```go
    import (
      [可选别名] "包名1"
      [可选别名] "包名2"
      ...
    )
    ```

=== "src/main/main.go"
    ```go title="src/main/main.go"
    package main
    
    import "utils"
    import "db"

    func main(){
        utils.A()
        db.A2()
    }
    ```

=== "src/utils/utils.go"
    ```go title="src/utils/utils.go"
    package utils

    func A(){ ... }
    func b(){ ... }
    ```

=== "src/db/db.go"
    ```go title="src/db/db.go"
    package db

    func A2(){ ... }
    func b2(){ ... }
    ```

### 注意事项

-   同一包下不可定义相同函数
-   编译成可执行程序，需声明包名为 `main`，编译需要在 `main` 包下
