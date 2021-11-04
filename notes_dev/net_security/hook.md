钩子
===
## HOOK介绍
* HOOK(钩子)是一种特殊的消息处理机制，在Windows中，它监视系统中发生的各种事件消息，截获发往目标窗口的消息并予以处理
* Windows系统提供了HOOK的系统接口

=== "正常的调用与返回"
    ```mermaid
    sequenceDiagram
      A->>B: Something
      B->>A: Something
    ```

=== "Hook的调用与返回"
    ```mermaid
    sequenceDiagram
      A->>Proxy: Something
      Proxy->>B: Something
      B->>Proxy: Something
      Proxy->>A: Something
    ```

## 钩子类型
### 按使用范围分类

`线程钩子`
:    监视指定线程的事件消息

`系统钩子`
:    监视所有线程的事件消息

!!! warning ""
    1. 如果同一事件同时拥有线程钩子和系统钩子，则先调用线程钩子
    2. 多个钩子处理过程可以应用在同一事件消息中，最近安装的钩子排在链的开始

### 按事件分类
1. 键盘消息：键盘钩子和低级键盘钩子，`WH_KEYBOARD`
2. 鼠标消息：鼠标钩子和低级鼠标钩子，`WH_MOUSE`
3. Shell事件消息：外壳钩子，`WH_SHELL`
4. 日志钩子可以记录从系统消息队列中取出的各种事件消息
5. 窗口过程钩子监视所有从系统消息队列发往目标窗口的消息：`WH_CALLWNDPROC`，`WH_CALLWNDPROCRET`，`WH_CBT`等

## 安装钩子：以键盘消息为例

=== "定义钩子函数"

    ```c
    LRESULT CALLBACK CallWndProc(int nCode,WPARAM wParam,LPARAM lParam)
    ```

    * 这是一个回调函数，每当有挂钩的消息时，就会调用该函数进行处理
    * `wParam`指示了消息是否由当前线程发送，非零值代表消息由当前线程发送
    * `lParam`指向了包含该消息详细信息的结构体
    * 最简单的消息处理函数将直接调用`CallNextHookEx()`，其中什么也没有做

=== "安装钩子"

    ```c
    HHOOK SetWindowsHookEx(
    WH_KEYBOARD, //键盘消息 原型为int idHook
    KeyboardProc, //钩子函数（处理键盘输入的函数）原型为HOOKPROC lpfn
    hInstance, //钩子函数所在DLL的Handle 原型为INSTANCE hMod
    0 //该参数用于设定要Hook的线程ID，为0时表示监视所有线程 原型为DWORD dwThreadId
    )
    ```

    * `SetWindowsHookEx()`返回所安装的钩子句柄

=== "卸载钩子"

    ```c
    BOOL UnhookWindowsHookEx(HHOOK hhk)
    ```

    * 移除安装在hook链条上的指定钩子，若成功则返回非零值
