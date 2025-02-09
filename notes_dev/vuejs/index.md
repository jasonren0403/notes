# 渐进式 JavaScript 框架——Vue.js[^1]

## 渐进式框架

渐进式框架是指框架的核心库只关注视图层，不仅可以单独使用，也可以和其他库或已有项目结合使用。

## 快速构建

### 借助 script 标签从 CDN 直接引入

=== "Vue 2"
    ```html
    <!-- 开发环境 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <!-- 生产环境 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/"></script>
    ```

=== "Vue 3"
    ```html
    <!-- 开发环境 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
    <!-- 生产环境 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
    ```

### 本地创建 Vue 项目

```bash
npm init vue@latest
```

### 单文件组件（*.vue）

在大多数启用了构建工具的 Vue 项目中，我们可以使用一种类似 HTML 格式的文件来书写 Vue 组件，它被称为单文件组件（也被称为 `*.vue` 文件，英文 Single-File Components，缩写为 SFC）。

在一个单文件组件中，包装有一个组件的逻辑（JavaScript）、模板（HTML）和样式（CSS）

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

## Vue 2 和 Vue 3 的区别 <span class="md-tags">面试常问！</span>

### 性能

Vue 3 的速度更快，体积更小（充分利用 webpack 的 tree-shaking 消除无用代码），并且支持更多的原生特性。

### 组合式 API

Vue 3 中，组件的逻辑可以使用 Composition API（组合式 API）来书写，可以将相关逻辑放在一起，更具有可读性。

Vue 2 主要采用的是 Options API（选项式 API）。

### TypeScript 支持

Vue 3 包含了更好的类型推断和检查，可以更好地支持 TypeScript。

### Teleport

Vue 3 新增了 Teleport，允许将组件渲染至 DOM 树中的任何位置。

### Fragments 支持

Vue 3 中，可以使用 `<template>` 标签来包裹多个元素，而不需要使用额外的 DOM 元素。

Vue 2 组件只能有一个根标签。

### 响应式实现

- Vue 2 中，响应式数据是通过 `Object.defineProperty` 来实现的，这种方式有一些限制，比如无法监听新增或删除的属性，也无法监听数组的索引和长度。
- Vue 3 中，响应式数据是通过 Proxy 来实现的，可以监听新增或删除的属性，也可以监听数组的索引和长度。

### 生命周期变化

- `destroyed` 被重命名为 `unmounted`
- `beforeDestroy` 被重命名为 `beforeUnmount`
- `beforeCreate` 和 `created` 合并至 `setup()` 中
- 在组合式 API 中，生命周期的名字需要加上 `"on"`

[^1]: https://cn.vuejs.org/guide/introduction.html
