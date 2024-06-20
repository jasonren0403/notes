---
tags:
    - Web前端基础
comments: true
---

# HTML[^1]

## HTML

- web标准：结构(xml或xhtml)+表现(css)+行为三方面(dom或ECMAScript)，相互分离
- HTML5（2014，最新） HTML4.01（1999 W3C推荐）

??? faq "为什么要符合Web标准？"
    页面响应快，易于维护，可访问性，设备兼容性，搜索引擎(优化)

## HTML元素与属性综述

- 元素组成
    - 一般元素
        - 起始标签(例如`<p>`)
        - 闭合标签(例如`</p>`)
        - 内容
    - 自闭合元素（例如`<hr />` `<meta />`）
- 大小写不敏感
- 可以嵌套

```html
<p>
    <span> some text. </span>
    some other text.
</p>
```

- 属性

    - 键值对，用`=`连接
        ```html
        <p class="editor-note"></p>
        ```

        - 布尔属性
            ```html
            <input type="text" disabled />
            ```

- 块级元素 vs 行级元素
    - 块级元素 `<p>` `<h1>-<h6>` `<div>` 列表和列表项 `<form>`等，会导致文本换行
    - 行级元素 `<span>` `<img>` `<a>`等，不会导致文本换行

## HTML文档结构

!!! summary ""
    * 完整的HTML文档 = 文档声明 + html元素
    * html元素 = head元素 + body元素

### 文档声明

html5的文档声明为`<!DOCTYPE html>` 必须位于第一行

- `<!DOCTYPE html>`声明没有结束标签，大小写不敏感

### html元素

- 包含了整个完整的页面，是一个根元素
- 为文档设定主语言：`lang` 属性

    - 意义：方便搜索引擎索引
    - 可分段设置
    - 常用lang代码

        - 简体中文：zh-CN
        - 英文：en-US

        !!! tip "lang code的组成"
            一般的lang code的标识组成为`language-extlang-script-region-variant-extension-privateuse`，可以在https://www.w3.org/International/articles/language-tags/ 网站上了解到关于lang code的更多信息

#### head元素

- 定义文档头部，可以引用脚本。

    - `<title>`元素是唯一必需的元素，定义了网页标题

        !!! info "标题有三个地方"
            - 定义浏览器工具栏中的标题
            - 提供页面被添加到收藏夹时的标题
            - 显示在搜索引擎结果中的页面标题

    - `<meta>`元素

        - 通过name属性定义作者(author)、关键词(keywords)、描述(description)、版权(copyright)等

            !!! info
                keywords请小心使用，过度堆积会导致反效果。应用Meta Description效果会好些。

        - `<meta name="robots" content="robotterms" />` 设定爬虫交互策略
            - `robotterms=all|none|index|noindex|follow|nofollow`
        - meta charset：网页文档的字符编码，通常为'utf-8'
        - meta http-equiv属性：帮助正确和精确地显示网页内容
        - 其他类型的元数据
            - "og:x"系列：The Open Graph protocol，是Facebook编写的元数据协议，官网为 https://ogp.me/
            - "twitter:x"系列：Twitter 的专有元数据协议

- 站点自定义图标：link元素 `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">`

    - 可以在打开的页面的标签页和收藏夹中看到它
    - gif和png文件也是支持的，使用ico文件是为了确保IE6的兼容性
    - 手机端（苹果或安卓）的自定义高分辨率图标：`<link rel="apple-touch-icon-precomposed" href="xxx" sizes="xxx">`

- <a id="apply-css-and-js-in-webpage"></a>在HTML中应用CSS和JavaScript

    |     　     |                  外部文件引入                  |                           内嵌                           |
    | :--------: | :--------------------------------------------: | :------------------------------------------------------: |
    |    CSS     | `<link href="css文件路径" rel="stylesheet" />` |     `<style type="text/css"> /* css样式 */</style>`      |
    | JavaScript |          `<script src="js文件路径">`           | `<script type="text/javascript">/* js代码区 */</script>` |

#### body元素

##### 段落与文字

- 标题 `<h1>` `<h2>` `<h3>` `<h4>` `<h5>` `<h6>`
    - `<h1>`是最大的标题，`<h6>`是最小的标题
    - 根据语义化要求，尽量不要使用标题元素来决定字体大小，最好使用[CSS](css.md)！
- 段落 `<p>` `</p>`
    - `<p>`与`</p>`内部元素的空格和换行将被忽略
    - `<br>`将产生换行（不会产生新段落）
    - `<hr>`将生成一条水平分隔线
- 文本格式化标签 `<strong>` `<em>`等

    - **语义化**：`<b>` → `<strong>` `<i>` → `<em>` `<s>` → `<del>` `<u>` → `<ins>`

        !!! tip "`<em>`和`<strong>`的区别"
            一个是粗体，一个是斜体，都表示强调。

            === "`<strong>`"
                粗体强调标签，表示内容的重要性
            === "`<em>`"
                斜体强调标签，更强烈的强调，表示内容的强调点

- 语义文本标签
    - 引用
        - 块引用：`<blockquote> </blockquote>`
            - 如果一个块级内容（一个段落、多个段落、一个列表等）从其他地方被引用，应该把它用 `<blockquote>` 元素包裹起来表示，并且在`cite`属性里用URL来指向引用的资源
            - 浏览器在渲染块引用时默认会增加缩进，作为引用的一个指示符
        - 行内引用：`<q> </q>`
            - 不需要分段的短引用
    - 缩略语 `<abbr>` `</abbr>`
        - 包裹一个缩略语或缩写，并且提供缩写的解释（包含在`title`属性中）
    - 联系方式 `<address>` `</address>`
        - 用于标记编写HTML文档的人的联系方式
    - 上标和下标
        - `<sub>` 下标
        - `<sup>` 上标
    - 展示计算机代码
        - `<code>`标记计算机通用代码
        - `<pre>` 保留空格字符
        - `<var>` 用于标记具体变量名
        - `<kbd>` 用于标记输入电脑的键盘（或其他类型）输入
        - `<samp>` 用于标记计算机程序的输出
    - 时间和日期 `<time>` `</time>`
        - 使用`datetime`属性来指定日期的值
    - 布局
        - `<header>`：页眉
        - `<nav>`：导航栏
        - `<main>`：主内容。主内容中还可以有各种子内容区段，可用`<article>`、`<section>` 和 `<div>` 等元素表示
        - `<aside>`：侧边栏，经常嵌套在 `<main>` 中
        - `<footer>`：页脚
- 无语义元素
    - `<div>`
        - 块级元素，是容器，帮助文档布局或设置样式属性（with CSS）
    - `<span>`
        - 内联元素
        - 一般用id或class属性赋予语义
- 注释 `<!--comments-->`
- 特殊字符 & → `&amp;` < → `&lt;` `>` → `&gt;` ' → `&apos;` " → `&quot;` 空格 → `&nbsp;`

##### 列表

=== "有序列表 (ordered list)`<ol>`" 
     - 用于标记有序的一些项目 
     - 设置编号：`start`属性 
     - 列表倒计数：`reversed`属性

=== "无序列表 (unordered list)`<ul>`"
     用于标记无序的一些项目

=== "描述列表 (description list)`<dl>`"
     内部元素：`<dt>`列表项 `<dd>`列表内容

!!! summary "无序列表和有序列表" 
     1. `<ol>`和`<ul>`内部一般有且仅有`<li>` 
     2. `<ol>`和`<ul>`可以相互嵌套
     3. 以后，可以用css：[list-style-type](css.md#列表样式)属性代替`type`属性

##### 表格

- `<table>` 元素定义表格
    - 每一行是`<tr>`元素
    - 单元格是`<td>`元素
- 默认没有边框和背景色，CSS负责美化表格
- `<caption>` 表格标题，只能有一个
- `<th>` 表头单元格，默认粗体居中显示。和td标签有`colspan`和`rowspan`属性，可以跨越多列或多行
    - `colspan`可以将横向的N个单元格合并
    - `rowspan`可以将纵向的N个单元格合并
- 语义化标签：`<thead>` `<tfoot>` `<tbody>`

##### 多媒体和嵌入

=== "<a name="html-pic"></a>图片"
    * 语法
        ```html
        <img src="xxx" alt="yyy" title="zzz" />
        ```
    * 属性
        * `title` 图片描述（给用户看）
            - 鼠标移到图片上悬停时，会显示`title`属性设置的内容
        * `alt` 备选文本（给搜索引擎看）
            - 在图片不能显示时（通常是路径错误或网络不通畅导致），`alt`属性将起作用
        * `src` 路径
            - 指向欲嵌入到网页中的图片资源地址
        * 图片的高度和宽度：`height` `width`属性
            - 建议使用CSS改变图片尺寸
    * 语义化：HTML5 `<figure>` `<figcaption>`元素
    * 如果图片是HTML的一部分，想被搜索引擎识别，则使用`<img>` 标签；如果图片仅起到装饰作用，不需要被搜索引擎识别，则使用 [CSS背景图片](css.md#背景样式)

=== "<a name="html-video"></a>视频"
    * 语法
        ```html
        <video src="xxx" [properties]> </video>
        ```
    * 属性
        - `src` 路径
            * 指向你想要嵌入网页当中的视频资源，用法同图片的`src`属性
        - 其他属性
            * `controls` 控制面板
                - 用户可以控制视频的播放进度，是布尔属性
            * `poster`
                - 视频的预览图片，会在播放前显示
            * `preload`
                - 缓冲较大的文件
                - 三个可选值
                    * "none"：不缓冲
                    * "auto"：页面加载后缓存媒体文件
                    * "metadata"：仅缓冲文件的元数据
    * `<video>`标签内的段落称为后备内容
        - 当浏览器不支持`<video>`标签时，它会显示出来
    * 多个`<source>`标签解决多格式支持问题
        - `type`属性是视频文件的MIME types，可选
        - 一般要支持WebM MP4
            ```html
            <source src="rabbit320.mp4" type="video/mp4">
            <source src="rabbit320.webm" type="video/webm">
            ```

=== "<a name="html-audio"></a>音频"
    * 语法
        ```html
        <audio [properties]> <source src="xx" type="yy"></audio>
        ```
    * 用法与`<video>`标签类似
        - 为数不多的不同点是它没有宽高属性，也不支持设定`poster`，因为它没有视觉部件

    !!! tip "更进一步——为音视频添加字幕"
        使用`<track>`标签，将其放置在`<audio>` 或`<video>`之间，`<source>`标签之后，用`kind`属性指定类型，链接vtt文件，用`srclang`属性告诉浏览器所用语言

        ```html
        <track kind="subtitles" src="subtitles_en.vtt" srclang="en"> <!-- (1) -->
        ```

        1. `vtt`文件包含了一个音视频的字幕信息

=== "<a name="html-embedding"></a>嵌入"
    * `<iframe>`标签
        - 属性
            * `src`：要嵌入文档的路径
            * `width`和`height`：框架的宽度和高度
            * `allowfullscreen`：是否可通过全屏API设置为全屏模式
            * `frameborder`：是否在此框架和其他框架之间绘制边框
                - 当设置为0时，等同于CSS中的`border:none`
            * `sandbox`：提供安全性设置

   * `<embed>`和`<object>`标签
       - 嵌入多种类型的外部内容的通用嵌入工具
       - `<embed>` 使用`src`作为资源地址，`<object>` 使用的是`data`

##### 超链接

```html
<a href="" title="" target="" [download=""]></a>
```

- 超链接可以指向任何东西，点击（或激活）超链接，可以从一个网址转到另一个网址上
    - 当浏览器不知道如何显示或处理文件，它会询问您是否要打开文件（需要选择合适的本地应用来打开或处理文件）或下载文件（以后处理它）
- `title`属性：鼠标悬停到链接上时，显示的提示信息
- `target`属性：超链接打开窗口的方式
    - `_self`：默认值，在原来窗口打开链接
    - `_blank`：在新窗口打开链接
    - `_parent`：在父窗口打开链接
    - `_top`：在顶层窗口打开链接
- `download`属性：下载默认保存的文件名
- 块级链接：`<a>`包裹其他元素
    - 所以文字、图片元素等都可以做链接
- 可以跳转到同页面，页面导航——锚点链接
    - 给要链接到的元素分配一个`id`属性
    - 链接时，在URL末尾使用井号（`#`）指向那个分配的`id`属性值
- 电子邮件链接
    - `href`属性值为`mailto:<email_addr>`
    - 可以指定主题(subject)、抄送(cc)、主体(body)等信息，它们均作为邮件URL的查询参数
        - 需要把每个字段的内容进行URL编码，不能有非打印字符

##### 表单（form）

- 实现用户和web应用的交互，HTML控制内容，CSS控制样式
- 语法

    ```html
    <form
        action="action_page_path"
        name=""
        [method=""
        target=""
        accept-charset=""
        enctype=""
        autocomplete=""
        novalidate]
    ></form>
    ```

    - 属性

        - action：表单提交到哪个地址，谁来处理
        - name：为表单命名，以区分不同的表单
        - method：使用哪一种HTTP提交方法发送数据，取值为GET或POST

            !!! info "GET vs POST"
                * GET通过URL提交数据，表单数据可见 `http://someweb/?param1=a&param2=b&...`
                    - 提交数据量受浏览器和web服务器限制（URL长度相关）
                * POST通过表单数据提交，数据在URL中不可见

        - target：等价于`<a>`元素
        - accept-charset：服务器处理表单数据所接受的字符集
        - enctype：提交内容编码方式（默认url编码，空格变加号，特殊符号变ASCII hex值）
        - autocomplete：是否根据用户之前输入的值自动补全
        - novalidate：是否启用`form`元素的原生校验机制

- 表单元素

    - `<input type="xx">`元素

        - 文本框text <input type="text" value="I can see it" style="border:0.5px solid #378888">

            ```html
            <input
                type="text"
                value="默认文字"
                size="文本框长度"
                maxlength="最多输入字符数"
            />
            ```

        - 密码文本框password <input type="password" value="Can you see me?" style="border:0.5px solid #378888">

            ```html
            <input
                type="password"
                value="默认文字"
                size="文本框长度"
                maxlength="最多输入字符数"
            />
            ```

        - 单选按钮radio <input type="radio" name="group" value="1" checked>

            ```html
            <input type="radio" name="所在组名" value="取值" [checked] />
            ```

            !!! tip "提示"
                同一组按钮要给定相同的`name`值

        - 复选框checkbox <input type="checkbox" value="value" name="group2" checked="checked"/>

            ```html
            <input
                type="checkbox"
                value="复选框取值"
                name="所在组名"
                checked[="checked"
                ]
            />
            ```

            !!! tip "提示"
                复选框的文本要加入`<label>`标签，用`for`指向该复选框的`id` (`label for="xx"`)

        - 文件选择器 <input type="file" name="file" id="file" accept="image/*" multiple>

            ```html
            <input type="file" name="file" id="file" accept="accept-file-mime" <!-- (1) --> multiple <!-- (2) --> >
            ```

            1. 接受文件类型
            2. 可选多个文件

        - 隐藏内容

            ```html
            <input type="hidden" id="x" name="y" value="z" />
            ```

            - 要求某些数据一同提交给服务器，但不显示给用户

        - 按钮button

            - 普通按钮 <input type="button" value="displays" onclick=""/>
                - `onclick`是点击按钮时执行的javascript脚本
            - 提交按钮 <input type="submit" value="displays on button" onclick=""/>
                - 单击提交按钮时，表单的数据会被发送到`<form>`元素的`action`属性定义的地址上
            - 重置按钮 <input type="reset" value="displays on button" onclick=""/>
                - 点击重置按钮时，所有的表单小部件会设置为它们的默认值

            !!! tip ""
                1. 提交和重置按钮只针对当前form表单有效
                2. 也可使用`<button>`元素定义按钮

        - 图片域image

            ```html
            <input type="image" src="path/to/image" />
            ```

            - 增加了鼠标点击图片时的相对焦点坐标

    - 多行文本输入：`<textarea>`元素

        ```html
        <textarea rows="行数" cols="列数">多行文本框内容</textarea>
        ```

        - `wrap`属性：控件如何包装文本

    - 下拉列表
        - `<select>`和`<option>`元素插入下拉选择框
            - 在需要设定默认值的`<option>`元素添加上`selected`属性
            - `multiple`属性允许列表被多选
        - `<optgroup>`设定选项分组
    - 自动补全输入

        - `<datalist>`配合`<input>`的`list`属性，datalist中每一个option项为待选输入

        > `datalist` 的 `id` 要对应于 `input` 的 `list`

    - fieldset和legend：控件组及其描述
    - label：设置标签
        > `input id="xx"` 要对应于 `label for="xx"`

[^1]:本章节参考资料主要来源于MDN开发网：https://developer.mozilla.org/zh-CN/docs/Learn/HTML/ 由Mozilla贡献者基于[CC-BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/)及以上版本发布的“HTML——构建Web” 结合相关文字和课件共同整理
