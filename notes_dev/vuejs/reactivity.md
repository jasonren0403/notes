# 响应式基础[^1]

!!! tip ""
    Vue 3 中的响应式系统是基于 ES2015 的 `Proxy` 实现的，它不再需要像 Vue 2 中那样通过 `Object.defineProperty` 来实现响应式[^2]，这使得 Vue 3 的响应式系统更加强大

!!! tip "选项式API和组合式API[^3]"

    === "选项式 API（Options API）"
        使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 `data`、`methods` 和 `mounted`。选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。

        ```vue
        <script>
        export default {
          // data() 返回的属性将会成为响应式的状态
          // 并且暴露在 `this` 上
          data() {
            return {
              count: 0
            }
          },
        
          // methods 是一些用来更改状态与触发更新的函数
          // 它们可以在模板中作为事件处理器绑定
          methods: {
            increment() {
              this.count++
            }
          },
        
          // 生命周期钩子会在组件生命周期的各个不同阶段被调用
          // 例如这个函数就会在组件挂载完成后被调用
          mounted() {
            console.log(`The initial count is ${this.count}.`)
          }
        }
        </script>
        
        <template>
          <button @click="increment">Count is: {{ count }}</button>
        </template>
        ```

    === "组合式 API（Compositions API）"
        通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 `<script setup>` 搭配使用。这个 `setup` attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。

        ```vue
        <script setup>
        import { ref, onMounted } from 'vue'
        
        // 响应式状态
        const count = ref(0)
        
        // 用来修改状态、触发更新的函数
        function increment() {
          count.value++
        }
        
        // 生命周期钩子
        onMounted(() => {
          console.log(`The initial count is ${count.value}.`)
        })
        </script>
        
        <template>
          <button @click="increment">Count is: {{ count }}</button>
        </template>
        ```

## 声明响应式状态

### 选项式 API

组件的响应式状态在 `data` 选项中声明，它是一个返回对象的<strong>函数</strong>，其中的属性将会被暴露在组件实例上。这个函数的返回值将会被用作响应式状态的初始值。

```js
export default{
    data(){
        return {
           count: 1
        }
    },
    // ...
    mounted(){
        console.log(this.count)  // 1
        
        this.count = 2
    }
}
```

!!! tip ""
    避免使用 `$` 和 `_` 开头的属性名，它们是 Vue 为内部保留的

### 组合式 API

使用 `reactive()` 函数创建一个响应式对象或数组：

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

要在组件模板中使用，需要在 `setup()` 函数中定义并返回。

```js
import { reactive } from 'vue'

export default {
    // `setup` 是一个专门用于组合式 API 的特殊钩子函数
    setup() {
        const state = reactive({ count: 0 })

        // 暴露 state 到模板
        return {
            state
        }
    }
}
```

```html
<div>{{state.count}}</div>
```

#### script setup

当使用单文件组件时，可以使用 `<script setup>` 语法大幅度简化代码。

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

### nextTick

在更新响应式状态后，DOM 会自动更新，然而这个操作是异步的，所以在更新后立即获取 DOM 的值可能会得到旧值。要在 DOM 更新后执行一些操作，可以使用 `nextTick` 函数：

```js
import { nextTick } from 'vue'

nextTick(() =>{
    // DOM 更新了
})
```

## 声明方法 <span class="md-tag">选项式 API</span>

要为组件添加方法，我们需要用到 `methods` 选项。它应该是一个包含所有方法的对象：

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // 在其他方法或是生命周期中也可以调用方法
    this.increment()
  }
}
```

定义的方法也可以在模板中访问到：

```html
<button @click="increment">Count is: {{ count }}</button>
```

!!! warning ""
    所有 `methods` 中的方法绑定了永远指定组件实例的 `this`，因此不应在定义时使用箭头函数

## 用ref定义响应式变量 <span class="md-tag">组合式 API</span>

!!! warning "reactive()的局限性"
    * 仅对对象类型有效，对原始类型无效
    * 不可替换响应式对象本身；将响应式对象赋值或解构至本地变量或传入函数时，会失去响应性

`ref()` 让我们创造了一种对任意值的“引用”，并能够在不丢失响应性的前提下传递这些引用。

```js
import { ref } from 'vue'

const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

在模板的<strong>顶层</strong>属性中，ref变量会被自动“解包”

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- (1)! -->
  </button>
</template>
```

1. 无需 .value

[^1]: https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html
[^2]: https://v2.cn.vuejs.org/v2/guide/reactivity.html
[^3]: https://cn.vuejs.org/guide/introduction.html#api-styles
