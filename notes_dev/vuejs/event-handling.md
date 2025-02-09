# 事件处理[^1]

一般使用 `v-on`（简写为`@`）指令来监听 DOM 事件。

* 内联事件处理器：事件被触发时执行的内联 JavaScript 语句
    - 可以在内联处理器中调用方法

        === "JavaScript"
            ```js
            methods: {
              say(message) {
                alert(message)
              }
            }
            ```
    
        === "模板"
            ```html
            <button @click="say('hello')">Say hello</button>
            <button @click="say('bye')">Say bye</button>
            ```

    - 如果向内联处理器传入特殊的 `$event` 变量，或使用内联箭头函数，可以访问原始的 DOM 事件

        ```html
        <!-- (1)! -->
        <button @click="warn('Form cannot be submitted yet.', $event)">
        Submit
        </button>
        
        <!-- (2)! -->
        <button @click="(event) => warn('Form cannot be submitted yet.', event)">
        Submit
        </button>
        ```

        1. 使用特殊的 $event 变量
        2. 使用内联箭头函数

* 方法事件处理器：指向组件上方法的属性名或路径
    - 方法事件处理器可以接收原生 DOM 事件并触发执行

## 事件修饰符

!!! tip "意义"
    在处理事件时，有时候我们想要阻止事件继续传播或者阻止默认行为，在方法中调用可以，但是不够优雅。事件修饰符可以让我们的方法专注于数据逻辑，而不用处理 DOM 事件细节

Vue 中的事件修饰符是用 `.` 表示的指令后缀，主要包含：

* `.stop`：事件停止传递（=`event.preventDefault()`）
* `.prevent`：阻止默认行为（=`event.stopPropagation()`）
* `.self`：仅当事件在该元素本身（而不是子元素）触发时触发事件处理器
* `.capture`：捕获模式处理（=`addEventListener(type, listener, {capture: true})`）
* `.once`：事件最多触发一次（=`addEventListener(type, listener, {once: true})`）
* `.passive`：告知浏览器所调用方法不会阻止事件的默认行为（=`addEventListener(type, listener, {passive: true})`），一般用于触摸事件的监听器

!!! tip ""
    修饰符使用的时候要注意顺序，且注意语义不要矛盾（如 `.passive` 和 `.prevent` 是不可混用的，`.prevent` 会被忽略且抛出警告）

## 按键修饰符

按键修饰符是使用 `KeyboardEvent.key` 暴露的名称作为修饰符，其命名为短横线分隔的大小写字母。常用的按键有：

* `.enter`：++enter++
* `.tab`：++tab++
* `.delete`：++delete++ 和 ++backspace++
* `.esc`：++esc++
* `.space`：++space++
* `.up`：++arrow-up++
* `.down`：++arrow-down++
* `.left`：++arrow-left++
* `.right`：++arrow-right++
* `.ctrl`：++ctrl++
* `.alt`：++alt++
* `.shift`：++shift++
* `.meta`：++meta++（Windows 键或者 Command 键）

多个按键可以同时指定（如 `@keyup.alt.enter`），也可以与点击事件结合使用（如 `@click.ctrl`）

### exact 修饰符

`exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。如果不使用 `exact` 修饰符，那么当按下 `ctrl` 或 `alt` 时，`@keyup.ctrl` 或 `@keyup.alt` 事件也会被触发。如果使用了 `exact` 修饰符，那么只有在按下 `ctrl` 或 `alt` 时才会触发 `@keyup.ctrl` 或 `@keyup.alt` 事件

### 鼠标按键修饰符

鼠标按键修饰符会限制处理函数仅相应特定鼠标按钮的点击事件，修饰符有这些：

* `.left`
* `.right`
* `.middle`

[^1]: https://cn.vuejs.org/guide/essentials/event-handling.html
