# Go 网络编程

## Golang Socket

=== "客户端"
    1. 与服务端建立连接
    2. 发送连接请求，接收响应
    3. 关闭连接

## 常用函数

> 大部分来自 `net` 包

-   `func Listen(net, laddr string) (listener, error)`
    -   `net`：网络类型，如 `tcp`、`udp` 等
    -   `type Listener interface`：监听器接口
        -   `func (l *TCPListener) Accept() (c Conn, err error)`
        -   `func (l *TCPListener) Close() error`
        -   `func (l *TCPListener) Addr() Addr`
-   `func Dial(net, addr string) (conn, error)`
-   `type Conn interface`：连接接口
    -   `func (c *TCPConn) Read(b []byte) (n int, err error)`
    -   `func (c *TCPConn) Write(b []byte) (n int, err error)`
    -   `func (c *TCPConn) Close() error`
    -   `func (c *TCPConn) LocalAddr() Addr`
    -   `func (c *TCPConn) RemoteAddr() Addr`
    -   `func (c *TCPConn) SetDeadline(t time.Time) error`
    -   `func (c *TCPConn) SetReadDeadline(t time.Time) error`
    -   `func (c *TCPConn) SetWriteDeadline(t time.Time) error`
