# 应用实例[^1]

每个 Vue 应用都是通过创建一个新的 Vue 实例开始的：

=== "Vue 2"
    ```js
    var vm = new Vue({
      // 选项
    })
    ```

=== "Vue 3"
    我们传入 `createApp` 的对象实际上是一个组件，每个应用都需要一个“根组件”，其他组件将作为其子组件。
    
    ```js
    import { createApp } from 'vue'
    const app = createApp({
      /* 根组件选项 */
    })
    ```

[^1]: https://cn.vuejs.org/guide/essentials/application.html
