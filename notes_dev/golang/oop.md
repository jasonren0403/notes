# Go 面向对象

Go 支持面向对象编程特性，以 `struct` 支持其他语言 `class` 的位置，面向接口（`interface`）编程。

## 结构体 struct

=== "声明"
    ```go
    type structName struct{
        PublicField <Type1>
        ...
        privateField <Type2>
        ...
    }
    `

=== "使用"
    ```go 
    var y structName // 此时字段就有零值（默认值）了
    y.<field>=...
    // 声明并初始化
    var name <Type> = [<Type>{/* 初值 */}]
    var name <*Type> = new(<Type>) // 指针
    var name <*Type> = &<Type>{} // 指针
    // 赋值
    (*name).<field> = <value>  // 括号不能去，.的优先级比*高
    name.<field> = <value>
    `

### 方法（结构体的“行为”）

> 作用在某个数据类型上

```go title="为类型Type绑定方法"
func (receiverName <Type>) methodName(parameters) <returnType>{
    // ...
}
```

-   实现 `String()` 方法，就可以自定义在 `fmt.Println()` 中的输出格式
-   为了提高效率，方法可与结构体指针类型绑定 `func (receiverName *<Type>) ...`
    -   其中访问字段时也可以使用指针访问 `(*receiverName).<field>`
-   实践
    -   工厂模式
        ```go
        func New<StructName>(<parameters>) *<StructName>{
            return &<StructName>{<parameters>} // 返回实例指针
        }
        ```
    -   封装
        ```go
        type <typeName> struct {
            <fields> // 小写首字母
        }
        // Getter
        func (var <typeName>) Get...() <returnType> {
            return var.<field>
        }
        // Setter
        func (var <typeName>) Set...(value <Type>) {
            var.<field> = value
        }
        ```

### 继承

=== "一级继承"
    ```go 
    type A struct { ... }
    type B struct {
        A // 嵌套匿名结构体
        ...
    }
    /* 就近原则 */
    var b B
    b.A.<field> // 等价于 b.<field>
    b.A.method() // 等价于 b.method()
    ```

=== "多重继承"
    相同方法或字段需结构体名区分    

    ```go
    type A struct {
      Name string
      age int
      ...
    }
    type B struct {
      Name string
      Score float64
      ...
    }
    type C struct {
      A
      B
      ...
    }
    var c C
    c.Name // 等价于 c.A.Name
    c1 := c{&A{...},&B{...}}  // 直接指定各个匿名结构的字段值
    ```

#### 组合

```go
type A struct {
  Name string
  age int
  ...
}
type B struct {
  Name string
  Score float64
  ...
}
type C struct {
  a A // 此时访问需带名称a
  ...
}
var c C
c.Name // 不可访问
c.A.Name // 可以访问
```

#### 匿名基本数据类型字段

一个结构体只能有一个

```go
type C struct {
    ...
    int // 匿名基本数据类型字段
}
var c C
c.int = ...
```

### 注意事项

-   结构体所有字段在内存中是连续的
-   结构体之间转换，需要有完全相同的字段
-   每个字段可以写上一个tag，用于序列化和反序列化

    ```go
    ... struct {
      Name <Type> `json:"name"` // 两端为反引号`，name是序列化字段名，内部实质利用了反射机制
      ...
    }
    ```

    -   常见序列化方式
        -   `json`（`encoding/json` 包 `json.Marshal(v interface{}) ([]byte, error)` 方法）
    -   反序列化

        -   `json`（`encoding/json` 包 `json.Unmarshal([]byte, &type) (error)` 方法，前后数据类型需一致）

        !!! info ""
        如果转化为map或slice类型，无需make，直接传入地址即可

## 接口 interface

> 引用类型，零值为 `nil`

```go
type XXX interface {
    A()
    B()
    ...
}

type A1 struct {
    ...
}

func (a A1) A() {
    ...
}

func (a A1) B() {
    ...
}

func (c C) ... (xxx XXX){  // 实现XXX接口声明的所有方法
    ...
}
```

### 多态

接口变量可以接收任意实现了该接口的实例

```text
     C
     |
  -------
  |     |
  A:C   B:C
[]C 可以放A和B两种类型的实例
```

### 应用

-   `sort.Sort(data interface)` 方法需要传入一个实现了 `sort.Interface` 接口的类型，定义如下
    ```go
    type Interface interface {
        Len() int
        Less(i, j int) bool
        Swap(i, j int)
    }
    ```
-   类型断言 `b=a.(Type)`、`y,ok:=a.(Type)`

### 注意事项

-   接口不可创建实例，但是可以指向实现该接口的自定义类型变量
-   只要是自定义数据类型，都可以实现接口
-   所有类型都实现了空接口 `interface{}`
