---
tags:
  - Vue.js
---

# 计算属性[^1]

模板中放入太多的逻辑会让模板变得臃肿，且难以维护，对于复杂的逻辑，应当使用计算（computed）属性来封装它们。

=== "选项式API"

    ```js
    export default {
      data() {
        return {
          author: {
            name: 'John Doe',
            books: [
              'Vue 2 - Advanced Guide',
              'Vue 3 - Basic Guide',
              'Vue 4 - The Mystery'
            ]
          }
        }
      },
      computed: {
        // 一个计算属性的 getter
        publishedBooksMessage() {
          // `this` 指向当前组件实例
          return this.author.books.length > 0 ? 'Yes' : 'No'
        }
      }
    }
    ```

    ```html
    <p>Has published books:</p>
    <span>{{ publishedBooksMessage }}</span>
    ```

=== "组合式API"

    ```vue
    <script setup>
    import { reactive, computed } from 'vue'
    
    const author = reactive({
      name: 'John Doe',
      books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
      ]
    })
    
    // 一个计算属性 ref
    const publishedBooksMessage = computed(() => {
      return author.books.length > 0 ? 'Yes' : 'No'
    })
    </script>
    
    <template>
      <p>Has published books:</p>
      <span>{{ publishedBooksMessage }}</span>
    </template>
    ```

!!! tip "使用计算属性的意义"
    虽然使用方法也可以达到类似的效果，但是计算属性是基于它们的响应式依赖进行缓存的，只有当响应式依赖发生改变时，它们才会重新求值。

## 可写计算属性

默认情况下，计算属性是只读的，但是也可以通过在计算属性中添加 setter 函数来实现可写的计算属性：

=== "选项式API"
    ```js
    export default {
      data() {
        return {
          firstName: 'John',
          lastName: 'Doe'
        }
      },
      computed: {
        fullName: {
          // getter
          get() {
            return `${this.firstName} ${this.lastName}`
          },
          // setter
          set(newValue) {
            const names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
          }
        }
      }
    }
    ```

=== "组合式API"
    ```vue
    <script setup>
    import { ref, computed } from 'vue'
    
    const firstName = ref('John')
    const lastName = ref('Doe')
    
    const fullName = computed({
      // getter
      get() {
        return firstName.value + ' ' + lastName.value
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [firstName.value, lastName.value] = newValue.split(' ')
      }
    })
    </script>
    ```

## 最佳实践

* Getter 应只做计算而没有其他的副作用，也就是说不要做异步请求或更改 DOM
* 避免直接修改计算属性值，应该使用计算属性的 setter 函数来修改值

[^1]: https://cn.vuejs.org/guide/essentials/computed.html