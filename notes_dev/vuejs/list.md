---
tags:
  - Vue.js
---

# 列表渲染[^1]

!!! info "v-for 和 v-if 指令优先级"
    * Vue 3：`v-if` > `v-for`
    * Vue 2：`v-for` > `v-if`

## 基本使用

!!! info "template 中的 v-for"
    与 `v-if` 一样，`v-for` 也可以在 `<template>` 元素上使用

`v-for` 的指令需要使用 `item in items` 形式的语法，其中 `items` 是源数据的数组，`item` 是迭代项的别名

```html
<!-- items=[{message: ...,}, {message: ...,}, ...] -->
<ul>
<li v-for="item in items"> <!-- (1)! --> <!-- (2)! -->
  {{ item.message }}
</li>
</ul>
```

1. 支持可选的第二个参数，表示索引：`(item, index) in items`
2. 也可以使用 `of`：`item of items`

## 遍历对象

可以使用 `v-for` 遍历对象，遍历顺序与 `Object.keys()` 顺序类似

```html
<!-- myObject={a: 1, b: 2, c: 3} -->
<ul>
  <li v-for="value in myObject">  <!-- (1)! -->  <!-- (2)! -->
    {{ value }}
  </li>
</ul>
```

1. 支持可选的第二个参数，表示属性名：`(value, key) in myObject`
2. 支持可选的第三个参数，表示索引：`(value, key, index) in myObject`

## v-for 范围

可以使用 `v-for` 来遍历一个整数范围（从 1 开始）

```html
<span v-for="n in 10">{{ n }}</span>
```

## 管理状态：key

key 用于跟踪节点标识，以便 Vue 内部重用和重新排序现有的元素。

在 `<template>` 上使用 `v-for` 时，`key` 要放置在 `<template>` 上。

在组件上使用 `v-for` 时，`key` 要放置在组件上。注意要单独绑定组件中每个数据。

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>

<MyComponent
        v-for="(item, index) in items"
        :item="item"
        :index="index"
        :key="item.id"
/>
```

!!! tip ""
    `:key` 的值最好是基础类型的值（`number`|`string`|`symbol`）。

## 数组更新检测

响应式数组的更新检测是通过数组的变更方法实现的。这些方法有：

* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `splice()`
* `sort()`
* `reverse()`

对于不可变方法（`filter()`、`concat()`、`slice()`），需要手动替换原数组。

!!! warning ""
    Vue2 使用了 `Object.defineProperty` 来实现响应式，且由于性能/体验问题，放弃了对数组、对象一些场景的变化监听。

    * 通过数组索引改变数组元素的值是无法监听到的
    * 对象属性的添加或删除是无法监听到的

    在这些情况下，应当使用 `Vue.set()` 或 `vm.$set()` API。如今 Vue3 采用了 `Proxy` 来实现响应式，可以监听数组、对象大部分的变化。

[^1]: https://cn.vuejs.org/guide/essentials/list.html
