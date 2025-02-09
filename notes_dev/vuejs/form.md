# 表单输入绑定[^1]

## 基本使用

前端处理表单时，需要将表单输入框中的内容同步给 JavaScript 中相应的变量，这个过程就是表单输入绑定。

这里，主要使用 `v-model` 指令来实现表单输入绑定。`v-model` 总会将 Vue 实例的数据作为数据来源，应当在组件的 `data` 选项或响应式系统 API 中声明该值。

```html
<input v-model="text">
```

=== "文本"
    ```html
    <p>Message is: {{ message }}</p>
    <input v-model="message" placeholder="edit me" />
    ```

=== "多行文本"
    ```html
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    ```

=== "复选框"
    ```html
    <input type="checkbox" id="checkbox" v-model="checked" /> <!-- (1)! -->
    <label for="checkbox">{{ checked }}</label>

    <!-- (2)! -->
    <div>Checked names: {{ checkedNames }}</div>
    
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    ```

    1. 单个复选框绑定了布尔类型值
    2. 也可以将多个复选框绑定到同一个数组或集合的值（`#!js const checkedNames = ref([])`）

=== "单选按钮"
    ```html
    <div>Picked: {{ picked }}</div>
    
    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>
    
    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    ```

=== "选择器"
    选择器的选项也可以用 `v-for` 动态渲染

    === "单选"
        ```html
        <div>Selected: {{ selected }}</div>
        
        <select v-model="selected">
          <option disabled value="">Please select one</option> <!-- (1)! -->
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        ```
    
        1. 如果 `v-model` 表达式的初始值不匹配任何一个选择项，`<select>` 元素会渲染成一个“未选择”的状态。在 iOS 上，这将导致用户无法选择第一项，因为 iOS 在这种情况下不会触发 change 事件。因此，我们建议提供一个空值的禁用选项，如上面的例子所示。

    === "多选（值绑定到一个数组）"
        ```html
        <div>Selected: {{ selected }}</div>
        
        <select v-model="selected" multiple>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        ```

## 值绑定

对于单选按钮、复选框及选择框的选项，`v-model` 绑定的值通常为字符串或布尔值，但有时需要将该值绑定到当前组件实例的动态数据，这可以使用 `v-bind` 来实现。

### 复选框

`true-value` 和 `false-value` 仅支持和 `v-model` 配套使用，在选中时，会设为 `true-value` 的值，取消的时候会设为 `false-value` 的值。

### 单选按钮

这时可以使用 `:value`，如下例，`pick` 的值会被设置为 `first` 或 `second`，取决于哪个单选按钮被选中。

```html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

### 选择器选项

```html
<!-- (1)! -->
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

1. 如果选中了 123，那么 `selected` 会被设为 `{ number: 123 }`

## 修饰符

### .lazy

令 `v-model` 在 `change` 事件后更新数据，而不是 `input` 事件。

### .number

自动将用户输入转换为数字类型。如果这个值无法被 `parseFloat()` 解析，则会返回原始值。

在 `<input type="number">` 中，`.number` 自动有效。

### .trim

自动过滤用户输入的首尾空白字符。

## 组件中的 v-model

前面的 `<input>` 例子中，表面上的代码是 `<input v-model="searchText" />`，内部编译器会展开为下面的等价形式：

```html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

在组件上的 `v-model` 会展开为这种形式：

```html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

组件内部需要

- 将内部原生 `<input>` 元素的 `value` 属性绑定到 `modelValue` 属性
- 当原生的 `input` 事件触发时，触发了一个携带了新值的 `update:modelValue` 自定义事件（`$emit('update:modelValue', $event.target.value)`）
- 也可以使用具有 getter 和 setter 的计算属性来代替 `modelValue` prop

    ```js
    import { computed } from 'vue'
    
    const props = defineProps(['modelValue'])
    const emit = defineEmits(['update:modelValue'])
    
    const value = computed({
        get(){ return props.modelValue },
        set(value){ emit('update:modelValue', value) }
    })
    ```

单个组件实例上可以创建多个 `v-model` 双向绑定，每个 `v-model` 都会同步不同的 prop。
  
### `v-model` 的参数

默认情况下，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应事件名。

可以通过给 `v-model` 指定参数更改这些名字：

```html
<MyComponent v-model:title="bookTitle" />
```

```vue title="MyComponent.vue"
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

### 处理 `v-model` 修饰符

除了内置修饰符，也可以自定义组件上的 `v-model` 修饰符。主要使用 `modelModifiers` prop。

```html
<MyComponent v-model.capitalize="bookTitle" />
```

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

如果 `v-model` 绑定既有参数又有修饰符，则生成的 prop 名将是 arg + `"Modifiers"`。

如对于 `<MyComponent v-model:title.capitalize="myText">` 来说，声明的 prop 应为 `['title', 'titleModifiers']`

[^1]: https://cn.vuejs.org/guide/essentials/forms.html
