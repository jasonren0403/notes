# 模板语法[^1]

Vue 使用了基于 HTML 的模板语法，所有的 Vue 模板都是语法层面合法的 HTML。

!!! tip ""
    也可通过 JSX 支持直接手写渲染函数（`h()`）来创建虚拟节点（vnode）

    ```js
    import {h} from 'vue'

    const vnode = h(
        'div', // type
        { id: 'foo', class: 'bar' }, // props
        [
        /* children */
        ]
    )
    ```

## 文本插值

最基本的数据绑定形式是使用“Mustache”语法（双大括号）的文本插值：

```html
<span>信息：{{ msg }}</span>
```

`{{ msg }}` 将会替换为相应组件实例中 `msg` 属性的值，当 `msg` 属性更改时它也会同步更新

### 插入原始 HTML

双大括号会将数据解释为普通文本，如果有插入 HTML 的需求，应使用 `v-html` 指令：

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

!!! warning ""
    尽量不要使用 `v-html` 来渲染动态 HTML，仅在内容可控时使用，否则容易导致 XSS 攻击

### Attribute 绑定

在 HTML 标签中绑定属性的做法是 `v-bind` 指令：

```html
<div v-bind:id="dynamicId"></div>
<!-- 或 -->
<div :id="dynamicId"></div>
```

`v-bind` 指示 Vue 将元素的 `id` 属性与组件的 `dynamicId` 属性保持一致，如果绑定的值是 `null` 或 `undefined`，则该属性将会从渲染的元素上移除

对于布尔型 Attribute，`v-bind` 的作用与它的存在与否完全一致，例如：

```html
<button :disabled="isButtonDisabled">一个按钮</button>
```

当 `isButtonDisabled` 为真值或空字符串时，元素会包含 `disabled` 属性，其他情况下该属性将被忽略

### 使用 JavaScript 表达式

Vue 在数据绑定中支持所有的 JavaScript 表达式，例如：

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>
```

表达式中可以使用组件暴露的方法，如：

```html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

!!! tip ""
    模板表达式中只能访问部分全局对象（其中有常用的 `Math` 和 `Date` 等），但可自行在 `app.config.globalProperties` 上（Vue 3）添加

!!! warning "仅支持表达式"
    每个绑定只支持单一表达式，不支持语句和流控制

## 指令（Directive）

Vue 中的指令是带有 `v-` 前缀的特殊 attribute，大多数指令的值都预期是单个 JavaScript 表达式。指令的作用是当表达式的值改变时，将产生的影响响应式地作用于 DOM 中。

指令的参数是在指令名称以冒号形式表示的

```html
<p v-if="seen">现在你可以看到我了</p>

<a v-bind:href="url">...</a>
<a :href="url">...</a>

<a v-on:click="doSomething">...</a>
<a @click="doSomething">...</a>
```

### 动态参数

该动态参数上的表达式的结果将作为参数传入指令中，其需要包含在一对方括号中，例如：

```html
<!-- 指令动态参数 -->
<a v-bind:[attributeName]="url"> ... </a>
<a :[attributeName]="url"> ... </a>
```

这个表达式的值应该是一个字符串或 `null`，其他值会触发警告

!!! tip ""
    如果动态参数表达式需要使用空格和引号，则应该使用计算属性替代

## 修饰符（Modifier）

修饰符是以点开头的特殊后缀，表明指令应该以特殊方式绑定，以下是一个修饰符的例子：

```html
<form @submit.prevent="onSubmit">...</form>
```

## 类（class）与样式（style）绑定[^2]

数据绑定的常见需求是操作元素的 CSS `class` 列表和内联样式，Vue 也为 `class` 和 `style` 的 `v-bind` 用法提供了增强。除了字符串以外，表达式的值也可以是对象或数组

### 类绑定

#### 绑定对象

```html
<div :class="{ active: isActive }"></div>

<!-- 也可以与普通 class 共存 -->
<div class="static"
     :class="{ active: isActive, 'text-danger': hasError }" <!-- (1) -->
></div>
```

1. `{isActive: true, hasError: false}` 时，该元素最终 `class` 为 `static active`，当 `isActive` 或 `hasError` 改变时，class 列表会随之更新

#### 绑定数组

可以给 `:class` 绑定一个数组来渲染多个 CSS 类：

```html 
<div :class="[activeClass, errorClass]"></div> <!-- (1)! -->

<div :class="[isActive ? activeClass : '', errorClass]"></div>  <!-- (2)! -->
```

1. `{activeClass: 'active', errorClass: 'text-danger'}` 时，渲染结果为 `<div class="active text-danger"></div>`
2. 有条件的渲染某个 class，可以使用三元表达式，本句意味着当 `isActive` 为真值时，`activeClass` 存在，而 `errorClass` 总是存在

### 内联样式绑定

#### 绑定对象

`:style` 绑定的 JavaScript 对象值对应了 HTML 元素的 `style` 属性，其中的 CSS 属性名可以使用驼峰或短横线分隔式命名

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div :style="{ 'font-size': fontSize + 'px' }"></div> <!-- (1)! -->
<div :style="styleObject"></div>  <!-- (2)! -->
```

1. 也支持短横线（对应其CSS实际名称）
2. 或者绑定到样式对象上（`#!js styleObject = {color: 'red', fontSize: '13px'}`）

#### 绑定数组

这些对象会被合并后渲染到同一元素上

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

#### 自动前缀

遇到需要使用浏览器特殊前缀的 CSS 属性时，Vue 会自动侦测并添加相应的前缀

#### 样式多值

对一个样式属性可以提供多个不同前缀的值，数组仅会渲染浏览器支持的最后一个值

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div> <!-- (1)! -->
```

1. 在支持不需要特别前缀的浏览器中，会渲染为 `display: flex`

## 模板引用[^3]

某些时候，需要直接访问底层的 DOM 元素，可以使用 `ref` attribute 为元素赋予一个 ID 引用

```html
<input ref="input" />
```

### 访问模板引用

!!! warning ""
    必须在组件挂载（mounted）后，才可以访问到模板引用。

=== "选项式 API"
    挂载结束后，引用都会暴露在 `this.$refs` 之上

    ```vue
    <script>
    export default {
      mounted() {
        this.$refs.input.focus()
      }
    }
    </script>
    
    <template>
      <input ref="input" />
    </template>
    ```

=== "组合式 API"
    需要声明一个同名的 ref，或者从 `setup()` 中返回 ref

    ```vue
    <script setup>
    import { ref, onMounted } from 'vue'
    
    // 声明一个 ref 来存放该元素的引用
    // 必须和模板里的 ref 同名
    const input = ref(null)
    
    onMounted(() => {
      input.value.focus()
    })
    </script>
    
    <template>
      <input ref="input" />
    </template>
    ```

    ```js
    export default {
        setup() {
            const input = ref(null)
            // ...
            return {
                input
            }
        }
    }
    ```

### v-for 中的 ref

`v-for` 的引用中，包含的值是一个数组，在元素被挂载后包含对应整个列表的所有元素。

!!! warning "注意"
    ref 数组与源数组不一定相同

### 函数模板引用

每次组件更新时会调用这个函数，其第一个参数为元素引用；卸载的时候，函数也会调用一次，此时参数为 `null`。

```html
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```

### 组件上的 ref

当 `ref` 用于一个组件时，引用指向的是组件实例。

最好使用 `expose` 限制对子组件实例的访问。

=== "选项式 API"
    此时，父组件对子组件的每个属性和方法都有完全的访问权。

    ```js
    export default {
      expose: ['publicData', 'publicMethod'],
      data() {
        return {
          publicData: 'foo',
          privateData: 'bar'
        }
      },
      methods: {
        publicMethod() {
          /* ... */
        },
        privateMethod() {
          /* ... */
        }
      }
    }
    ```

=== "组合式 API"
    注意，使用 `<script setup>` 的组件是默认私有的，需要使用 `defineExpose` 宏显式暴露属性。

    ```vue
    <script setup>
    import { ref } from 'vue'
    
    const a = 1
    const b = ref(2)
    
    // (1)!
    defineExpose({
      a,
      b
    })
    </script>
    ```

    1. `defineExpose()` 是编译器宏，无需导入

[^1]: https://cn.vuejs.org/guide/essentials/template-syntax.html
[^2]: https://cn.vuejs.org/guide/essentials/class-and-style.html
[^3]: https://cn.vuejs.org/guide/essentials/template-refs.html
