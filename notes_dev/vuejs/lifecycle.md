# 生命周期[^1]

每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置数据监听、编译模板、挂载实例到 DOM、以及在数据改变时更新 DOM。在此过程中，会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。

=== "选项式 API"
    是位于 `export default {}` 对象中的一个方法，如

    ```js
    export default {
        mounted() {
            console.log(`the component is now mounted.`)
        }
    }
    ```

=== "组合式 API"
    需要在 `setup()` 阶段同步调用，或使用 `<script setup>` 语法糖。使用生命周期钩子前，需要导入，如：

    ```vue
    <script setup>
    import { onMounted } from 'vue'
    
    onMounted(() => {
      console.log(`the component is now mounted.`)
    })
    </script>
    ```

## 生命周期图示

!!! warning ""
    本段待更新

[//]: # (todo)

[//]: # (```mermaid)

[//]: # (%% https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)

[//]: # (flowchart TD)

[//]: # (    )
[//]: # (```)

## 主要生命周期[^2][^3]

### beforeCreate 

在组件实例初始化完成之后立即调用。此时组件的属性如 `data`、`methods` 等还未初始化。

=== "选项式 API"
    ```js
    export default {
        beforeCreate() {
            console.log(`beforeCreate`)
        }
    }
    ```

### created

在组件实例处理完所有与状态相关的选项后调用。此时响应数据、计算属性、方法和侦听器已经设置完成，但是 `$el` 不可用。

=== "选项式 API"
    ```js
    export default {
        created() {
            console.log(`created`)
        }
    }
    ```

### beforeMount

在组件被挂载前调用。组件已经完成了响应式状态设置。

=== "选项式 API"
    ```js
    export default {
        beforeMount() {
            console.log(`beforeMount`)
        }
    }
    ```

=== "组合式 API"
    ```vue
    <script setup>
    import { onBeforeMount } from 'vue'
    
    onBeforeMount(() => {
      console.log(`beforeMount`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

### mounted

在组件被挂载之后调用。

=== "选项式 API"
    ```js
    export default {
        mounted() {
            console.log(`mounted`)
        }
    }
    ```

=== "组合式 API"
    ```vue
    <script setup>
    import { onMounted } from 'vue'
    
    onMounted(() => {
      console.log(`mounted`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

### beforeUpdate

在组件即将因为一个响应式状态变更而更新其 DOM 树前调用。

=== "选项式 API"
    ```js
    export default {
        beforeUpdate() {
            console.log(`beforeUpdate`)
        }
    }
    ```

=== "组合式 API"
    ```vue
    <script setup>
    import { onBeforeUpdate } from 'vue'
    
    onBeforeUpdate(() => {
      console.log(`beforeUpdate`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

### updated

在组件因为一个响应式状态变更而更新其 DOM 树之后调用。

=== "选项式 API"
    ```js
    export default {
        updated() {
            console.log(`updated`)
        }
    }
    ```

=== "组合式 API"
    ```vue
    <script setup>
    import { onUpdated } from 'vue'
    
    onUpdated(() => {
      console.log(`updated`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

!!! warning ""
    不要在这个钩子内更改组件的状态，可能会导致更新循环。

### beforeUnmount

!!! tip ""
    在 Vue 2 中，它被称为 `beforeDestroy`。

在一个组件实例被卸载之前调用。调用它时，组件实例还保有全部的功能。

=== "选项式 API"
    ```js
    export default {
        beforeUnmount() {
            console.log(`beforeUnmount`)
        }
    }
    ```

=== "组合式 API"
    ```vue
    <script setup>
    import { onBeforeUnmount } from 'vue'
    
    onBeforeUnmount(() => {
      console.log(`beforeUnmount`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

### unmounted

!!! tip ""
    在 Vue 2 中，它被称为 `destroyed`。

在一个组件实例被卸载后调用。可用于手动副作用清理、取消网络请求、解绑全局事件等。

=== "选项式 API"
    ```js
    export default {
        unmounted() {
            console.log(`unmounted`)
        }
    }
    ```

=== "组合式 API"
    ```vue
    <script setup>
    import { onUnmounted } from 'vue'
    
    onUnmounted(() => {
      console.log(`unmounted`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

### activated

在组件被激活（`<KeepAlive>` 缓存树一部分被插入至 DOM）时调用。可用于在组件激活时获取数据。

=== "选项式 API"
    ```js
    export default {
        activated() {
            console.log(`activated`)
        }
    }
    ```

=== "组合式 API"
    ```vue
    <script setup>
    import { onActivated } from 'vue'

    onActivated(() => {
      console.log(`activated`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

### deactivated

若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 DOM 中被移除时调用。

=== "选项式 API"
    ```js
    export default {
        deactivated() {
            console.log(`deactivated`)
        }
    }
    ```
=== "组合式 API"
    ```vue
    <script setup>
    import { onDeactivated } from 'vue'

    onDeactivated(() => {
      console.log(`deactivated`)
    })
    </script>
    ```

!!! tip ""
    这个钩子在服务端渲染时不会调用。

[^1]: https://cn.vuejs.org/guide/essentials/lifecycle.html
[^2]: https://cn.vuejs.org/api/options-lifecycle.html
[^3]: https://cn.vuejs.org/api/composition-api-lifecycle.html
