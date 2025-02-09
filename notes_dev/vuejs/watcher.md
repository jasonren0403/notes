# 侦听器[^1]

响应式属性变化时，有时需要执行一些副作用，例如更改 DOM，或者根据异步操作的结果修改另一处的状态。Vue 使用监听器实现这个需求：

=== "选项式 API"

    ```js
    export default{
        data(){
            return {
                // ...
            }
        },
        watch: {
            prop1(newValue, oldValue){
                // ...
            }
        }
    }
    ```

    * `watch` 选项也支持把键设置成用 `.` 分隔的简单路径

=== "组合式 API"
    其中，`watch` 的第一个参数可以是一个 `ref`、响应式对象、getter 函数或多个数据源组成的数组

    ```vue
    <script setup>
    import { reactive, ref, watch } from 'vue'
    
    const prop1 = ref('')
    const prop2 = ref(0)
    const obj = reactive({ a: 1 })
    
    watch(prop1, (newValue, oldValue) =>{
      // ...
    })

    watch(
        () => obj.a,  // (1)!
        (newValue, oldValue) =>{
            // ...
        }
    )
    // (2)!
    watch([prop2, ()=>obj.a], ([newProp2, newObja])=>{
        // ...
    }
    </script>
    ```

    1. 这里是个 getter！不能写成 `obj.a`，否则会导致监听失效
    2. 多个来源组成的数组

## 深层监听器

`watch` 默认是浅层的，嵌套属性变化不会触发回调函数。如果需要深层监听，可以使用 `deep` 选项：

=== "选项式 API"

    ```js
    export default{
        data(){
            return {
                // ...
            }
        },
        watch: {
            prop1: {
                handler(newValue, oldValue){
                    // ...
                },
                deep: true
            }
        }
    }
    ```

=== "组合式 API"
    直接给 `watch()` 传入响应式对象，会隐式地创建深层侦听器

    ```vue
    <script setup>
    import { reactive, watch } from 'vue'
    
    const prop1 = reactive({ a: 1 })
    
    watch(prop1, (newValue, oldValue) => {
      // ...
      }, 
      { deep: true }
    )
    </script>
    ```

## 即时回调的侦听器

`watch` 在默认情况下仅当数据源变化时才执行回调，但在某些场景中，需要创建侦听器时立即执行回调。这时可以传入 `{ immediate: true }` 选项来实现：

=== "选项式 API"

    ```js
    export default{
        data(){
            return {
                // ...
            }
        },
        watch: {
            prop1: {
                handler(newValue, oldValue){
                    // ...
                },
                immediate: true
            }
        }
    }
    ```

=== "组合式 API"

    ```vue
    <script setup>
    watch(source, (newValue, oldValue) => {
        // 
    }, { immediate: true })
    </script>
    ```

## watchEffect <span class="md-tag">组合式 API</span>

侦听器的回调使用与源完全相同的响应式状态是很常见的，这时已有的 `watch` 代码可以简化为 `watchEffect` 写法，`watchEffect` 会自动收集依赖，并在依赖变化时重新运行回调：

=== "watch"

    ```js
    const todoId = ref(1)
    const data = ref(null)
    
    watch(todoId, async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
      )
      data.value = await response.json()
    }, { immediate: true })
    ```

=== "watchEffect"

    ```js
    watchEffect(async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
      )
      data.value = await response.json()
    })
    ```

!!! tip "`watch` vs. `watchEffect`"
    * `watch` 只追踪明确侦听的数据源，而 `watchEffect` 会追踪函数体内部所有响应式状态的变化
    * `watch` 仅在数据源变化时执行回调，而 `watchEffect` 在组件初始化时会执行一次回调，然后在依赖变化时再次执行回调

## 回调的触发时机

默认情况下，用户创建的侦听器回调会在 Vue 组件更新之前调用。如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 `flush: 'post'` 选项：

=== "选项式 API"

    ```js
    export default {
      // ...
      watch: {
        key: {
          handler() {},
          flush: 'post'
        }
      }
    }
    ```

=== "组合式 API"

    ```js
    watch(source, callback, {
      flush: 'post'
    })
    
    watchEffect(callback, {
      flush: 'post'
    })
    // 或
    import { watchPostEffect } from 'vue'
    
    watchPostEffect(() => {
        /* 在 Vue 更新后执行 */
    })
    ```

`flush` 的其它取值为：

* `pre`：默认
* `sync`：与 `watch` 一样使其为每个更改都强制触发侦听器（不建议这样做）

## 停止侦听器

侦听器往往在组件卸载时即自动停止。如果需要在组件卸载前停止侦听器，需要调用侦听器 API 返回的函数：

```js
const unwatch = this.$watch('foo', callback) // (1)!
const unwatch = watch(source, callback) // (2)!
const unwatch = watchEffect(()=>{})
// ...当该侦听器不再需要时
unwatch()
```

1. 选项式 API
2. 组合式 API

[^1]: https://cn.vuejs.org/guide/essentials/watchers.html
