---
tags:
  - Vue.js
---

# 组件[^1]

组件将所构建的网页划分为独立、可重用的部分，并且可以对每个部分进行单独的思考。

## 定义组件

=== "使用构建步骤"
    此时，一般将 Vue 文件定义在一个单独的 `.vue` 文件中，这个文件叫做单文件组件（SFC）

    ```vue
    <script setup>
    import { ref } from 'vue'
    
    const count = ref(0)
    </script>
    
    <template>
      <button @click="count++">You clicked me {{ count }} times.</button>
    </template>
    ```

=== "不使用构建步骤"
    一个 Vue 组件以一个包含特定选项的 JavaScript 对象来定义

    ```js
    import { ref } from 'vue'
    
    export default {
      setup() {
        const count = ref(0)
        return { count }
      },
      template: `
        <button @click="count++">
          You clicked me {{ count }} times.
        </button>`
      // (1) 
    }
    ```

    1. 也可以使用 ID 选择器指向一个元素（通常是原生 `<template>` 元素），将其作为模板（`template: '#my-template-element'`）

## 使用组件

要使用子组件，可以直接通过 `import` 语句来导入，如果是选项式 API，需要在 `components` 选项中注册它。

### 组件注册[^2]

=== "全局注册"
    通过 Vue 应用实例的 `app.component()` 方法，可以让组件在当前 Vue 应用中全局可用。该方法可以链式调用，以注册多个组件。

    ```js
    import { createApp } from 'vue'
    
    const app = createApp({})
    
    app.component(
      // 注册的名字
      'MyComponent',
      // 组件的实现
      {
        /* ... */
      }
    )
    ```
    
    当然，可以注册被导入的 `.vue` 文件。
    
    ```js
    import MyComponent from './App.vue'
    
    app.component('MyComponent', MyComponent)
    ```

=== "局部注册"
    通过 `components` 选项或直接在 `<script setup>` 中使用，可以在一个父组件中注册子组件，使其在子组件中可用。这样的注册方式可以使组件之间的依赖关系更加明确，对于之后的打包优化（tree-shaking 等）过程更加友好。

    ```js
    import MyComponent from './MyComponent.vue'
    
    export default {
      components: {
        MyComponent
      },
      // ...
    }
    ```

    `components` 对象中，键名是组件的名字，键值是组件的实现。

### 组件名称

为了方便，Vue 支持将使用短横线连字符（kebab-case）命名解析为帕斯卡（PascalCase）命名，这意味着以 `MyComponent` 命名的组件，可以通过 `<MyComponent>` 或 `<my-component>` 引用。

### 传递 props

!!! tip ""
    props 传递属于单向数据流，子组件不应修改父组件传递的 props，否则会在控制台中产生警告。

向组件传递数据的方法之一是 props，可以在组件上声明注册。一个组件可以接受任意数量的 props，默认情况下，所有 prop 都接受任意类型的值。

=== "选项式 API"

    ```vue
    <script>
    export default {
      props: ['title']
    }
    </script>
    
    <template>
      <h4>{{ title }}</h4>
    </template>
    ```

=== "组合式 API"

    ```js
    <script setup>
    defineProps(['title'])
    </script>
    
    <template>
      <h4>{{ title }}</h4>
    </template>
    ```

    如果没有使用 `<script setup>`，props 必须以 `props` 选项的方式声明，props 对象会作为 `setup()` 函数的第一个参数被传入：

    ```js
    export default {
      props: ['title'],
      setup(props) {
        console.log(props.title)
      }
    }
    ```

除了使用字符串数组来声明 prop 外，还可以使用对象的形式；其中，key 是 prop 的名称，而值是 prop 预期类型的构造函数：

```js title="不使用 script setup"
export default {
    props: {
        title: String,
        likes: Number
    }
}
```

```js title="使用 script setup"
defineProps({
    title: String,
    likes: Number
})
```

```ts title="使用 TypeScript 的 script setup"
defineProps<{
    title: string
    likes: number
}>()
```

也可以使用没有参数的 `v-bind`，在传入的时候等价于绑定了其中所有的 prop。

#### prop 校验

Vue 组件可以声明对传入的 props 的校验要求，可通过带有 props 校验选项的对象提供验证规则。

```js title="校验对象"
props = {
    propA: Number, // (1)
    propB: [String, Number], // (2)
    propC: {
        type: String,
        required: true  // (3)
    },
    propD: {
        type: Number,
        default: 100 // (4)
    },
    propE: {
        type: Object,
        default: function (rawProps) {
            return { message: 'hello' } // (5)
        }
    },
    propF: {
        validator: function (value) {
            return ['success', 'warning', 'danger'].indexOf(value) !== -1 // (6)
        }
    },
    propG: {
        type: Function,
        default: () => {} // (7)
    }
}
```

1. 基础类型检查（输出 `null` 或 `undefined` 会跳过任何类型检查）
2. 多种可能类型
3. required 指定该属性必须传递
4. default 指定该属性的默认值
5. 对象或数组的默认值必须从工厂函数返回
6. 自定义类型校验函数
7. 函数类型的默认值是一个用来作为默认值的函数

#### 运行时类型检查

校验选项的 `type` 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

也可以是自定义的类或构造函数，Vue 会通过 `instanceof` 检查类型是否匹配

#### Boolean 转换

如果一个 prop 被声明为 `Boolean` 类型，则该组件可以这样使用：

```html
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

### 监听事件

子组件可以通过 `emit` 方式来向父组件发送消息，父组件可以通过 `v-on` 监听子组件的消息。

* 在选项式 API 中，可以通过 `emits` 选项声明需要抛出的事件
* 在组合式 API（script setup）中，可以通过 `defineEmits` 宏来声明需要抛出的事件，也可以通过 `setup()` 函数的第二个参数中访问到 `emit` 函数
    - `setup(props, ctx)` 中 `ctx.emit()`

### 通过插槽分配内容

* 要向组件中传递内容，可以使用 Vue 的自定义 `<slot>` 元素实现。它标示了父元素提供的插槽内容将在哪里被渲染。
* 插槽内容可以是任意合法的模板内容，不局限于文本。
* 插槽内容可以访问到父组件的数据作用域，但无法访问到子组件的数据。

=== "插槽内容"

    ```html
    <FancyButton>
      Click me! <!-- 插槽内容 -->
    </FancyButton>
    ```

=== "插槽出口"

    ```html title="FancyButton.vue"
    <button class="fancy-btn">
      <slot></slot> <!-- 插槽出口，如需默认内容，在slot标签之间写入内容即可 -->
    </button>
    ```

#### 具名插槽

* 一个组件中可以包含多个插槽出口，可以通过 `name` attribute 来定义额外的插槽，用于给各个插槽分配唯一 ID：
* 没有提供 `name` 的 `<slot>` 出口会隐式命名为 default

    ```html title="BaseLayout.vue"
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
    ```

* 向内部传递时，需要使用 `v-slot:` 指令，并以插槽名作为参数，其中 `v-slot` 可以简写为 `#`

    ```html
    <base-layout>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <!-- (1) -->
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>

      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
    </base-layout>
    ```
  
    1. 下面的两个 `<p>` 元素被隐式地视为默认插槽内容

#### 动态插槽名

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

#### 作用域插槽

某些场景下，插槽的内容可能需要同时使用父组件域和子组件域内的数据。这时，可以向一个插槽的出口上传递 attributes：

```html title="<MyComponent> 的模板"
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

接受 props 时，子组件默认插槽可以使用标签上的 `v-slot` 指令接收到插槽 props 对象：

```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
<!-- (1) -->
```

1. 这里当然支持解构写法：`v-slot="{ text, count }"`

子组件具名作用域插槽中的 props 可以作为 `v-slot` 指令的值被访问到：`v-slot:name=slotProps`

```html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

向上述模板传入这个 props：

```html
<slot name="header" message="hello"></slot>
```

在 headerProps 中会接收到 `{ message: 'hello' }`（`name` 是 Vue 保留的 attribute，不会作为 props 传递给插槽）

!!! tip ""
    如果同时指定了具名插槽和默认插槽，需要为默认插槽使用显式的 `<template>` 标签

    ```html
    <template>
      <MyComponent>
        <!-- 使用显式的默认插槽 -->
        <template #default="{ message }">
          <p>{{ message }}</p>
        </template>
    
        <template #footer>
          <p>Here's some contact info</p>
        </template>
      </MyComponent>
    </template>
    ```

### 动态组件

有的场景需要在多个组件间切换，如 Tab 界面，这是通过 Vue 的 `<component>` 元素加 `is` attribute 实现的：

```html
<component :is="tabs[currentTab]"></component>
```

被传给 `:is` 的值可以是：

* 注册的组件名称
* 导入的组件对象

当使用 `:is` 在多个组件间切换时，被切换的组件会被卸载。如果需要保持“存活”状态，则需要使用 `<KeepAlive>` 组件。

## DOM 模板解析注意事项

* HTML 标签和属性名称是不分大小写的。在 DOM 中书写模板时，需要使用 kebab-case 形式，并显式地关闭组件的标签。
* 某些 HTML 元素对于放在其中的元素类型有限制，在使用此类限制元素的组件时会出现问题，这时需要使用 `is` attribute，并使用前缀 `vue:`，避免与原生的自定义内置元素混淆。

[^1]: https://cn.vuejs.org/guide/essentials/component-basics.html
[^2]: https://cn.vuejs.org/guide/components/registration.html