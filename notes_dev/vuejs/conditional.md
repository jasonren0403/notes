# 条件渲染[^1]

## v-if

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值的时候被渲染。

如同 JavaScript 中的 `if-else` 一样，`v-if` 也有相应的 `v-else` 和 `v-else-if` 块。

```html
<div v-if="cond1">condition 1</div>
<div v-else-if="cond2">condition 2</div>
<div v-else>Neither condition 1 nor condition 2</div>
```

`v-if`、`v-else-if` 和 `v-else` 也可以直接作用在 `<template>` 元素上，可以切换多个元素的可见状态。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## v-show

`v-show` 也可以根据条件显示一个元素，用法与 `v-if` 一样。

```html
<h1 v-show="ok">Hello!</h1>
```

!!! tip ""
    `v-show` 始终会在 DOM 上渲染该元素，仅仅是切换了 `display` CSS 属性

[^1]: https://cn.vuejs.org/guide/essentials/conditional.html