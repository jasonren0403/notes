Web开发技术基础——JavaScript与DOM
===

!!! info "DOM的必要性"
	DOM：Document Object Model ，文档对象模型
	DOM提供了用于HTML和XML文档的应用程序编程接口，处在为JavaScript 赋予HTML 具备动态交互效果的能力的核心地位上，与特定编程语言相独立
	各种实现：JavaScript、Python（`xml.dom`库等）


## DOM
* 观点：在HTML DOM中，所有事物都是节点
* 文档结构类似于树，但不一定使用树实现
	- 这个树型表示使用<b>结构模型</b>一词来描述
		* 一个重要属性：结构同构
* DOM标准[^1]

	=== "DOM Level 0"
		* JavaScript 在早期版本中提供了查询和操作Web 文档内容的API，比如图像和表单。

	=== "DOM Level 1"
		* 由DOM 核心与DOM HTML 两个模块组成
		* 以映射文档结构为目标，DOM 核心能映射以XML 为基础的文档结构，允许获取和操作文档的任意部分
		* DOM HTML 通过添加HTML 专用的对象与函数对DOM 核心进行了扩展

	=== "DOM Level 2"
		* 增强了交互能力，也支持更高级的XML 特性
		* 又扩充了鼠标、用户界面事件、范围、遍历等细分模块，而且通过对象接口增加了对CSS 的支持
		* 引入了下列模块，包含了众多新类型和新接口
			- DOM 视图（DOM Views）：定义了跟踪不同文档视图的接口
			- DOM 事件（DOM Events）：定义了事件和事件处理的接口
			- DOM 样式（DOM Styles）：定义了基于CSS 为元素应用样式的接口
			- DOM 遍历和范围（DOM Traversal and Range）：定义了遍历和操作文档树的接口

	=== "DOM Level 3"
		* 通过引入统一方式载入和保存文档和文档验证方法对DOM进行进一步扩展，引入了以下模块
			- DOM 加载和保存模块（DOM Load and Save）：引入了以统一方式加载和保存文档的方法
			- DOM 验证模块（DOM Validation）：定义了验证文档的方法
			- DOM 核心的扩展（DOM Styles）：支持XML1.0 规范，涉及到XML Infoset 、XPath 和XML Base

    === "DOM Level 4"
		仍然处于草案阶段

### DOM节点

=== "元素节点"
	- 通常元素有子元素、文本节点或者两者的结合，元素节点是唯一能够拥有属性的节点类型
	- `html` 、`head` 、`title` 、`body` 、`div` 、`ul` 、`li` 等都属于Element（元素节点）

=== "属性节点"
	- 属性节点代表了元素中的属性，因为属性实际上是附属于元素的 ，属性节点其实被看做是包含它的元素节点的一部分，它并不作为单独的一个节点在文档中出现。
	- HTML 元素的属性如`id` 、`class` 、`href` 等都属于Attr（属性节点）

=== "文本节点"
	- 文本节点是只包含文本内容的节点，文本节点可以只包含空格。
	- 在文档树中元素的文本内容和属性的文本内容都是由文本节点来表示

=== "注释节点"
    - 注释节点（Comment）是包含文档注释的节点

=== "文档节点"
	- 文档节点（Document）是文档树的根节点，它是文档中其他所有节点的父节点

=== "文档类型节点"
    - 每个Document 都有一个`DocumentType` 属性，它的值或是`null` ，或者是`DocumentType` 对象

=== "文档片段节点"
	- 文档片段节点（Document Fragment）是轻量级的或最小的Document 对象，它表示文档的一部分或者是一段，不属于文档树。

### DOM树
* 浏览器提供`document`节点代表整个文档
* 第一层节点/根节点：`<html>`
* 其他节点：三种层级关系
	1. 父节点关系：直接上级节点
	2. 子节点关系：直接下级节点
	3. 兄弟节点关系：拥有同一个父节点

### DOM的对象与接口
* 当浏览器解析完HTML 文档后，每个节点并非只是一个单纯的`Element` 对象，而是继承了很多属性和方法，`Element` 对象继承了`Node` 对象的所有属性和方法

#### Node接口
* 所有DOM对象都继承了DOM接口，拥有共同的属性和操作方法
* DOM API
	- 属性
		* `nodeType`：`Number`，节点类型
			- document: `Node.DOCUMENT_NODE(9)`
			- element: `Node.ELEMENT_NODE(1)`
			- attr: `Node.ATTRIBUTE_NODE(2)`
			- text: `Node.TEXT_NODE(3)`
			- document fragment: `Node.DOCUMENT_FRAGMENT_NODE(11)`
			- document type: `Node.DOCUMENT_TYPE_NODE(10)`
			- comment: `Node.COMMENT_NODE(8)`
		* `nodeName`：`string`，节点名称
			- document: `#document`
			- element: 大写的标签名
			- attr: 属性名称
			- text: `#text`
			- document fragment: `#document-fragment`
			- document type: 文档的类型
			- comment: `#comment`
		* `nodeValue`：`string`，该节点本身的文本值，可以读写
			- 只有`text`、`comment`、`attr`节点有文本值，有返回结果，可设置属性。
			- 其余返回`null`，不可设置`nodeValue`属性
		* `textContent`：`string`，返回当前节点和它的所有后代节点的文本
			- text、comment、attr节点的该属性与`nodeValue`属性相同
			- 其他类型节点，会将每个子节点（不包括注释节点）的内容连接在一起返回。如果一个节点没有子节点，则返回空字符串
			- 可读写，可自动对HTML标签转义
		* `baseURI`：`string`，当前网页的绝对路径
			- 只读，返回URI编码过的路径值，获取真实值需要用`decodeURI()`解码
			- 该属性的值一般由当前网址的 URL（即`window.location`属性）决定，但是可以使用 HTML 的`<base>`标签，改变该属性的值。设置了以后，`baseURI` 属性就返回`<base>` 标签设置的值
		* `ownerDocument`：`Document`，返回当前节点所在的顶层文档对象，即`document` 对象
		* `nextSibling`和`previousSibling`：`Node`
			- `nextSibling`：返回紧跟在当前节点后面的第一个同级节点，如果当前节点后面没有同级节点，则返回`null`
				* 如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格
				* 遍历所有节点
					```javascript
					var e1 = document.getElementbyId('divA').firstChild;
					while(e1!=null){
						/* do some operations to element */
						e1 = e1.nextSibling;
					}
					```
			- `previousSibling`：返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回`null`
				* 如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格
		* `parentNode`和`parentElement`：`Node`
			- `parentNode`，当前节点的父节点，只可能是元素节点、文档节点、文档片段节点之一
			- `parentElement`，当前节点的父<b>元素</b>节点
		* `firstChild`和`lastChild`：`Node`
			- `firstChild`：返回当前节点的第一个子节点，返回的可能是元素节点、文本节点或注释节点，如果当前节点没有子节点，则返回`null`
			- `lastChild`：返回当前节点的最后一个子节点，用法与`firstChild`相同
		* `childNodes`：`NodeList`，包括当前节点的所有子节点
		* `isConnected`：`boolean`，当前节点是否在文档中
			- 使用`createElement()`生成的节点默认不在文档中
	- DOM节点常用操作
		* `appendChild(new)`：`Node`，将传入的`Node`对象作为最后一个子节点插入当前节点，若已经存在，则将其移动到新位置
			- 若参数是`DocumentFragment`节点，该方法将插入`DocumentFragment`的所有子节点，不仅仅是`DocumentFragment`本身
		* `hasChildNodes()`：`boolean`，当前节点是否有子节点
			- 这里的子节点包括所有类型的节点
			- 还有两种方法可以做相同判断
				1. `node.firstChild !== null`
				2. `node.childNodes && node.childNodes.length > 0`
		* `cloneNode(cloneChild)`：`Node`，克隆一个节点
			- 接受一个布尔值作为参数，表示是否克隆子节点
			- 会拷贝该节点的所有属性，但是会失去`addEventListener` 方法和`on-` 属性（例如`node.onclick = fn`）添加在这个节点上的事件回调函数。
			- 返回的节点不在文档中，要使用`appendChild()`等方法插入
			- 调用后，可能出现两个`id`属性相同的元素，需要修改其中一个元素的该属性
		* `insertBefore(new,reference)`：`Node`，将某个节点插入父节点内部的指定位置
			- 将插入节点放在参考子节点的前面，若已经存在，则将其移动到新位置
			- 如果`reference`为`null`，插入最后方

			!!! tip "提示"
				如果新节点要插在父节点的某个子节点后面，可以使用`insertBefore`方法结合`nextSibling`属性来模拟：

                ```js
                document.body.insertBefore(p,divA.nextSibling);
                ```

		* `removeChild(delete)`：`Node`，从当前节点移除该子节点。
			- 参数节点不是当前节点的子节点，将报错
		* `replaceChild(new,old)`：`Node`，将一个新的节点，替换当前节点的某一个子节点
		* `contains()`：`boolean`，判断参数节点是否满足以下三个条件：
			1. 参数节点为当前节点
			2. 参数节点为当前节点的子节点
			3. 参数节点为当前节点的后代节点
		* `compareDocumentPosition()`：`Number`
			- 与`contains()`用法基本相同，返回的是七个比特位的二进制值，表示参数节点与当前节点的关系

			!!! summary "`compareDocumentPosition()`的返回值和含义"
				| 二进制值 | 含义 |
				| :--: | :--: |
				|000000|两个节点相同|
				|000001|两个节点不在同一个文档|
				|000010|参数节点在当前节点的前面|
				|000100|参数节点在当前节点的后面|
				|001000|参数节点包含当前节点|
				|010000|当前节点包含参数节点|
				|100000|浏览器内部使用|

			!!! tip "小技巧：判断文档结构是否正确"
				```javascript
				if(document.head.compareDocumentPosition(document.body) & 4){
					console.log('structure right');
				}else{
					console.log('Do not put <body> before <head>');
				}
				```

		* `isEqualNode()`和`isSameNode()`：`boolean`
			- `isEqualNode()`：用于检查两个节点是否相等
				* 所谓相等，指的是两个节点的类型相同、属性相同、子节点相同
			- `isSameNode()`：表示两个节点是否为同一个节点

		* `normalize()`
            - 将当前节点和它的后代节点”规范化“
            - 在一个"规范化"后的DOM树中，不存在一个空的文本节点，或者两个相邻的文本节点。

        * `getRootNode()`：`Node`，返回当前节点所在文档的根节点
			- 与`ownerDocument`属性的作用相同

	- 节点集合接口：`NodeList`和`HTMLCollection`

		!!! tip "它们之间的本质区别"
			- `NodeList`可以包含各种类型的节点
			- `HTMLCollection` 只能包含 HTML 元素

		* `NodeList`接口
			- 得到`NodeList`实例：
				1. `Node.childNodes`

					!!! warning ""
						注意：IE8之前的版本不会将空白文本当为子节点，故返回的`childNodes`值会偏小

				2. 节点搜索方法，比如`document.querySelectorAll()`

			- `NodeList` 实例很像数组
				* 但是它并不是数组！
				* 存在`length`属性和`forEach`方法
				* `item(index)`：返回该位置的成员

		* `HTMLCollection`接口
			- 只能包含元素（element）节点
			- `length`属性返回`HTMLCollection` 实例的成员数量
			- `item(index)`：返回该位置的成员
			- `namedItem(val)`：返回`val`指定的`id`或`name`属性对应的元素节点，没有则返回`null`

#### `ParentNode`接口
* 如果当前节点是父节点，就会继承`ParentNode`接口
* 只有元素节点（element）、 文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会继承ParentNode接口
* 方法与属性
	* `children` 属性返回一个`HTMLCollection` 实例，成员是当前节点所有元素子节点，该属性只读
	* `children` 属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）
	* `firstElementChild` 属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回`null`
		- `firstElementChild`不兼容IE8以下版本浏览器，慎用
	* `lastElementChild` 属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回`null`
	* `childElementCount` 属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回0
	* `append` 方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面
	* `prepend` 方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面

#### `ChildNode`接口
* 如果一个节点有父节点，那么该节点就继承了`ChildNode`接口
* 方法与属性
	* `remove` 方法用于从父节点移除当前节点
	* `before` 方法 /`after` 方法用于在当前节点的前面/后面，插入一个或多个同级节点。两者拥有相同的父节点。
		 - 该方法不仅可以插入元素节点，还可以插入文本节点
	* `replaceWith` 方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本

#### DOM的主要对象
* Document 节点对象，代表整个文档
	- `window.document`指向网页自身的`document`对象
	- 只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用

    === "便捷访问文档内部的某个节点：快捷方式属性"

        === "`document.body`"
            指向`<body>`节点

        === "`document.head`"
            指向`<head>`节点

        === "`document.activeElement`"
            返回获得当前焦点（focus）的 DOM 元素

        === "`document.fullscreenElement`"
            返回当前以全屏状态展示的 DOM 元素

    === "节点集合属性"
		* 均返回`HTMLCollection`实例
		* 一些属性

            === "`document.links`"
                返回所有设定了`href`属性的`<a>`及`<area>`节点

            === "`document.forms`"
                返回所有`<form>`表单节点

            === "`document.images`"
                返回页面所有`<img>`图片节点

            === "`document.embeds`, `plugins`"
                返回所有`<embed>`节点

            === "`document.scripts`"
                返回所有`<script>`节点

            === "`document.styleSheets`"
                返回文档内嵌或引入的样式表

    === "文档静态信息属性"

        === "`document.documentURI`, `document.URL`"
            返回一个字符串，表示当前文档的网址

        === "`document.domain`"
            返回当前文档的域名，不包含协议和接口

        === "`document.lastModified`"
            返回当前文档最后修改时间的字符串

        === "`document.title`"
            返回当前文档的标题，该属性是可写的

        === "`document.characterSet`"
            返回当前文档的编码

    === "文档状态属性"

        === "`document.hidden`"
            返回布尔值，表示当前页面是否可见

        === "`document.visibilityState`"
            返回文档的可见状态

            - `visible`：页面可见
    		- `hidden`：页面不可见
    		- `prerender`：渲染状态，对用户不可见
    		- `unloaded`：页面从内存中卸载了

        === "`document.readyState`"
            返回当前文档的状态

            - `loading`：加载HTML代码阶段
    		- `interactive`：加载外部资源阶段
    		- `complete`：加载完毕

    === "对象方法"

        === "`document.querySelector`"
            接受一个 CSS 选择器作为参数，返回第一个匹配该选择器的元素节点，如果没有则返回`null`

        === "`document.querySelectorAll`"
            返回一个`NodeList`对象，包含所有匹配给定选择器的节点

        === "`document.getElementsByTagName`"
            * 搜索HTML 标签名，返回符合条件的元素
    			* 返回值是一个类似数组对象（`HTMLCollection`实例），可以实时反映 HTML 文档的变化
    			* 如果没有任何匹配的元素，就返回一个空集

        === "`document.getElementsByClassName`"
            返回所有`class` 名字符合指定条件的元素，元素的变化实时反映在返回结果中

        === "`document.getElementsByName`"
            选择所有拥有`name` 属性的 HTML 元素

        === "`document.getElementById`"
            * 返回匹配指定`id` 属性的元素节点

            !!! tip ""
                一个网页上一般只有一个指定`id`属性的元素，故方法名为单数`Element`

        === "`document.elementFromPoint`"
            返回位于页面指定位置最上层的元素节点

        === "`document.elementsFromPoint()`"
            * 返回一个数组，成员是位于指定坐标（相对于视口）的所有元素
    			- 两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素
    			- 如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）
    			- 如果坐标值无意义（比如负值或超过视口大小），返回`null`

        === "`document.createElement()`"
            * 生成元素节点，并返回该节点
    			- `document.createTextNode` 方法用来生成文本节点（Text 实例），并返回该节点，参数是文本内容字符串
    			- `document.createAttribute` 方法用来生成属性节点（Attr 实例），并返回该节点，参数是属性名称
    			- `document.createComment` 方法用来生成注释节点，并返回该节点，参数是注释内容字符串
    			- `document.createDocumentFragment` 方法生成一个空的文档片段对象（DocumentFragment）实例

    === "事件"

        === "`document.createEvent(type)`"
            创建一个指定类型事件，参数为事件类型，需要使用`initEvent()`方法初始化。

        === "`EventTarget.addEventListener(type, listener, options/useCapture)`"
            将指定的监听器注册在`EventTarget`上，当对象触发指定的事件时，指定回调函数会被执行。

        === "`EventTarget.removeEventListener()`"
            删除使用 `EventTarget.addEventListener()` 方法添加的事件。

        === "`EventTarget.dispatchEvent()`"
            向一个指定事件目标派发一个事件，并以合适顺序同步调用目标元素相关的事件处理函数。

        ```javascript
		/* 实例代码 */
		var event = document.createEvent('Event');
		event.initEvent('build',true,true);
		document.addEventListener('build',function(e){
			console.log(e.type);  // (1)
		},false);
		document.dispatchEvent(event);  // (2)
		```

        1. 输出`build`
        2. 触发事件

* 元素节点（Element）对象，代表对应网页的HTML元素
	- Element 对象继承了Node 接口，因此Node 的属性和方法在Element 对象都存在
	- 属性

        === "`Element.id`"
            返回指定元素的`id`属性，该属性可读写

        === "`Element.tagName`"
            返回指定元素的大写标签名，与`nodeName`属性的值相等

        === "`class`相关属性"
			- `className` 属性用来读写当前元素节点的`class`属性。它的值是一个字符串，每个`class`之间用空格分割
			- `classList` 属性返回一个类似数组的对象，当前元素节点的每个`class`就是这个对象的一个成员
				* `classList`对象方法：增删改查`class`
					- 增：`add`
					- 删：`remove`
					- 改：`toggle`
					- 查：`contains` 或 `item(index)`

        === "`Element.innerHTML`"
			返回一个字符串，等同于该元素包含的所有HTML 代码，该属性可读写，能改写所有元素节点的内容，常用来设置某个节点的内容，包括`<HTML>` 和`<body>` 元素

        === "`Element.outerHTML`"
			返回一个字符串，表示当前元素节点的所有HTML 代码，包括该元素本身和所有子元素，该属性可读写

        === "遍历元素子节点"
			- `Element.children`：返回一个类似数组的对象（HTMLCollection 实例），包括当前元素节点的所有子元素。
				* 如果当前元素没有子元素，则返回的对象包含零个成员
				* 与`Node.childNodes`属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点
			- `Element.childElementCount`：返回当前元素节点包含的子元素节点的个数
				* 与`Element.children.length`的值相同
			- `Element.firstElementChild`：返回当前元素的第一个元素子节点
			- `Element.lastElementChild`：返回最后一个元素子节点
			- `Element.nextElementSibling`：返回当前元素节点的后一个同级元素节点，如果没有则返回`null`
			- `Element.previousElementSibling`：返回当前元素节点的前一个同级元素节点，如果没有则返回`null`

        === "访问HTML属性"
			- `Element.attributes`：返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上
			- 操作属性：`getAttribute()`、`getAttributeNames()`、`setAttribute()`、`hasAttribute()`、`hasAttributes()`、`removeAttribute()`

			!!! summary "使用JavaScript动态操作CSS"

                === "操作Style属性"
					1. `getAttribute` 方法、`setAttribute` 方法和`removeAttribute` 方法，直接读写或删除网页元素的`style`属性
					```javascript
					div.setAttribute(
						'style',
						'background-color:red;'+ 'border:1px solid black;'
					);
					```
					相当于
                    ```html
                    <div style="background-color:red;border:1px solid black;"/>
                    ```

                    2. `document.body.style`： `CSSStyleDeclaration`对象
					    * 这个对象所包含的属性与 CSS 规则一一对应，但是连词号需要变成骆驼拼写法，改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写；如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串css
    						- `cssText` 属性用来读写当前规则的所有样式声明
    						- `length` 属性返回一个整数值，表示当前规则包含多少条样式声明
    						- `getPropertyPriority` 方法接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置`important` 优先级。如果有就返回`important`，否则返回空字符串
    						- `setProperty`方法设置CSS属性

				=== "操作样式表文件"
					1. `document.styleSheets`：返回当前页面的所有StyleSheet 实例（即所有样式表），一个类似数组的对象
					2. `CSSStyleSheet.cssRules`：指向一个类似数组的对象（CSSRuleList 实例）
						- 每个成员是当前样式表的一条 CSS规则，可以通过`rules.item(index)` 或者`rules[index]` 拿到
						- CSS 规则的条数通过`rules.length` 拿到
					3. `CSSStyleSheet.insertRule`方法用于在当前样式表的插入一个新的 CSS 规则
					4. `CSSStyleSheet.deleteRule`方法用来在样式表里面移除一条规则，参数是该条规则在`cssRules` 对象中的位置

* 属性节点（Attribute）
	- 属性本身是一个对象（Attr 对象），但实际上 ，这个对象极少使用，一般都是通过元素节点对象（HTMLElement对象）来操作属性
* 文本节点（Text）
	- 代表元素节点对象和属性节点对象的文本内容
	- 创建一个文本节点：`document.createTextNode()`
	- 属性：`data`（等同于`nodeValue`属性）——设置或读取文本内容
		* 编辑`Text`节点文本内容的方法

            === "增"
                `appendData()`（尾部增加字符串）和`insertData()`（指定位置插入字符串，第一个参数为插入位置，第二个位置为待插入字符串）

            === "删"
                `deleteData()`（第一个参数为子字符串开始位置，第二个参数为长度）

            === "改"
                `replaceData()`（替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串）

            === "查"
                `subStringData()`（获取子字符串，第一个参数为子字符串在`Text`节点中的开始位置，第二个参数为子字符串长度）

* DocumentFragment 节点
	- 本身就是一个完整的 DOM 树形结构
	- 它没有父节点，parentNode 返回`null`，但是可以插入任意数量的子节点
	- 它不属于当前文档，操作DocumentFragment节点，要比直接操作 DOM 树快得多
	- 用于构建一个 DOM 结构，然后插入当前文档

        ```javascript
		var docFrag = document.createDocumentFragment(); // (1)
		var li = document.createElement('li');
		li.textContent = 'hello world';
		docFrag.appendChild(li);
		document.querySelector('ul').appendChild(docFrag); // (2)
		document.querySelector('ul').appendChild(docFrag.cloneNode(true));
		```

        1. 可以用`new`创建，也可以用`document.createDocumentFragment()`来创建
        2. 本行代码运行后，`docFrag`在添加结束后会被清空(`textContent`变为`''`)，如果想保留其中内容，使用`cloneNode()`方法

## 事件
在JavaScript 中，事件往往是页面的一些动作引起的，例如当用户按下鼠标或者提交表单，甚至在页面移动鼠标时，事件都会出现。

!!! summary "JavaScript的主要事件"
	鼠标事件、键盘事件、表单事件、编辑事件、页面相关

!!! info "浏览器的事件模型"
	通过监听函数（listener）对事件做出反应。事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。

### 为事件绑定监听函数
1. 在HTML 元素的 `on-` 属性中直接定义某些事件的监听代码

    ```html
    <body onload = "doSomething()"> <!-- (1) -->
    ```

    1. 该事件只在冒泡阶段触发

2. 设置元素节点对象的事件属性指定监听函数

    * 这种方法与 HTML 的`on-` 属性的差异是，它的值是函数名（`doSomething`），而不必给出完整的监听代码（`doSomething()`）

    ```javascript
    window.onload = doSomething;  // (1)
    ```

    1. 该事件只在冒泡阶段触发

3. 所有 DOM 节点都有`addEventListener`方法，用来为该节点定义事件的监听函数

    !!! success "优点"
		- 同一个事件可以添加多个监听函数
		- 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发监听函数
		- 除了 DOM 节点，其他对象（比如`window`）也有这个接口，是整个 JavaScript 统一的监听函数接口

    !!! warning ""
        IE8无`addEventListener`方法，但有类似的`attachEvent()`方法，可以为同一事件绑定多个事件处理函数，但是后绑定的先执行

### DOM事件操作
- DOM 的事件操作（监听和触发），都定义在`EventTarget` 接口上
{: .stressed }
- 三个实例方法
	* `addEventListener` ：绑定事件的监听函数
		- 原型：`target.addEventListsner(type,listener[,useCapture])`
		- type ：事件名称，大小写敏感
		- listener ：监听函数，事件发生时会调用该监听函数
		- 属性配置对象：该对象常用属性如下：
			* useCapture ：布尔值，表示监听函数是否在捕获阶段（capture）触发，可选参数，默认为`false`（监听函数只在冒泡阶段被触发）
			* once：布尔值，表示监听函数是否只触发一次，然后就自动移除
	* `removeEventListener` ：移除事件的监听函数
		- 参数与`addEventListener`完全一致
	* `dispatchEvent`：触发事件，参数为一个`Event`对象实例
- 事件的传播与处理
	- 一个事件发生后，会在子元素和父元素之间传播（propagation）
	- 事件一开始从文档的根节点流向目标对象（所谓捕获阶段），然后在目标对向上被触发（所谓目标阶段），之后再回溯到文档的根节点（所谓冒泡阶段）
		* 捕获阶段，事件从document一直向下传播到目标元素，依次检查经历过的节点是否绑定了事件监听函数（事件处理程序），如果有则执行，反之不执行
		* 目标阶段，事件到达目标元素，触发目标元素的监听函数
		* 冒泡阶段，事件从目标元素冒泡到document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行，反之不执行
	- 代理（Delegation）
		* 把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件
	- 停止传播
		* `event.stopPropagation()`
		* 不要触发节点的其他事件监听函数：`event.stopImmediatePropagation()`

#### 鼠标事件
- click：按下鼠标（通常是按下主按钮）时触发
- dblclick：在同一个元素上双击鼠标时触发
- mousedown：按下鼠标键时触发
- mouseup：释放按下的鼠标键触发
- mousemove：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发，建议限定一段时间内只能运行一次
- mouseenter：鼠标进入节点时触发，进入子节点不会触发这个事件
- mouseover：鼠标进入节点时触发，进入子节点会再一次触发这个事件
- mouseout：鼠标离开节点时触发，离开父节点也会触发这个事件
- mouseleave：鼠标离开节点时触发，离开父节点不会触发这个事件
- contextmenu：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文菜单键”时触发
- mousewheel：滚动鼠标的滚轮时触发，该事件继承的是WheelEvent 接口
	* `wheelDelta` 或 `event.detail`（Firefox）: 滚轮滚动的方向，向上滚为正值(`wheelDelta`)或负值(`event.detail`)，向下滚为负值(`wheelDelta`)或正值(`event.detail`)

    !!! warning ""
        火狐浏览器使用`DOMMouseScroll`来添加滚动事件，且需要使用`addEventListener()`

#### 键盘事件
- keydown：按下键盘时触发
	* 通过`event.keyCode`和`event.(alt|ctrl|shift)Key`来判断哪一个键被按下
- keypress：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta这样无值的键，这个事件不会触发。对于有值的键，按下时先触发`keydown`事件，再触发这个事件
- keyup：松开键盘时触发该事件

#### 表单事件
- `input`事件
	* 当`<input>` 、`<select>` 、`<textarea>` 的值发生变化时触发，对于复选框（`<input type=checkbox>`）或单选框（`<input type=radio>`），用户改变选项时，也会触发这个事件。
	* `input` 事件的一个特点，就是会连续触发，比如用户每按下一次按键，就会触发一次`input`
- `select`事件
	* 在`<input>` 、`<textarea>` 里面选中文本时触发
- `change`事件
	* `change`事件当`<input>`、`<select>`、`<textarea>`的值发生变化时触发。
	* 它与`input`事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发
	* `input`事件必然伴随`change`事件
- `invalid`事件
	* 用户提交表单时，如果表单元素的值不满足校验条件，会触发`invalid`事件
- `reset`事件，`submit`事件
	* 这两个事件发生在表单对象`<form>`上，而不是发生在表单的成员上
	* `reset`事件当表单重置（所有表单成员变回默认值）时触发
	* `submit`事件当表单数据向服务器提交时触发
		- 注意，`submit`事件的发生对象是`<form>`元素，而不是`<button>`

#### `load` 事件
* `load`事件在页面或某个资源加载成功时触发。注意，页面或资源从浏览器缓存加载，并不触发`load`事件
* 浏览网页就是一个加载各种资源的过程 ，图像（image）、样式表（stylesheet）、脚本（script）、视频（video）、音频（audio）、Ajax 请求（XMLHttpRequest）等等。这些资源和`document`对象、`window`对象都会触发`load`事件

#### 窗口事件
* `scroll`事件在文档或文档元素滚动时连续触发，主要出现在用户拖动滚动条时
	- 推荐使用`setTimeout`控制该事件的触发频率
* `resize`事件在改变浏览器窗口大小时连续触发，主要发生在`window`对象上面

## 浏览器对象模型（BOM）

!!! info ""
	Browser Object Model，即“访问和操作浏览器窗口的模型”，把“浏览器”当做一个“对象”来看待

!!! tip "对象模型思想"
	像操作对象一样来操作这个 X，对象X的属性可以通过 `X.attribute` 这种形式来访问，对象的方法可以通过`X.method(arguments)`这种形式来调用

* BOM 提供控制浏览器行为的接口，最核心的对象是`window`对象，没有相关标准

### `Window`对象
* 指当前的浏览器窗口
* 窗口关系：`window.top`，`window.parent`，`window.self`
	* 框架：`window.frames[]`(index or framename)
	* 窗口位置：`window.screen[Left|Right]`，`window.screen[X|Y]`，`window.move[To|By](x,y)`
	* 窗口大小：`window.[inner|outer][Width|Height]`，`document.body.client[Width|Height]`，`resizeTo(width,height)`，`resizeBy(width,height)`
	* 导航和打开窗口：`window.open(url[,target,[windowsSettings]])`，`window.opener`，`window.close()`
	* 系统对话框：`alert()`，`confirm()`，`prompt()`，`print()`，`find()`

### `Navigator`对象
* `window.navigator` → `Navigator`对象包含浏览器和系统信息，javascript 脚本通过这个对象了解用户的环境信息
	- 检测浏览器：`navigator.userAgent`，`navigator.appName`，`navigator.appVersion`
		* 由于历史原因，`navigator.appName`已经不足以帮助我们判断浏览器标识了
	- 检测插件：`navigator.plugins`
		* `window.ActiveXObject`仅IE浏览器具有，Edge浏览器也无效
    		- 使用`"ActiveXObject" in window`，可以解决这个差异

###	`Screen`对象
* 指当前窗口所在的屏幕
* 属性
    * `window.screen` → `Screen`对象表示当前窗口所在的屏幕，提供显示设备的信息
    * `Screen.height`：浏览器窗口所在的屏幕的高度（单位像素）
    * `Screen.width`：浏览器窗口所在的屏幕的宽度（单位像素）
    * `Screen.availHeight`：浏览器窗口可用的屏幕高度（单位像素），等于height减去那些被系统组件（如任务栏区域）的高度
    * `Screen.availWidth`：浏览器窗口可用的屏幕宽度（单位像素）
    * `Screen.pixelDepth`：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩
    * `Screen.orientation`：返回一个对象，表示屏幕的方向

### `Location`对象
* `Location`对象是浏览器提供的原生对象，提供URL相关的信息和操作
	- `window.location`和`document.location`都指向这个对象
	- 直接打印`Location`对象，可以获取到当前页面的完整路径
* 字符串属性
	- `location.href`：包含整个URL的一个DOMString
	- `location.search`：包含URL参数的一个DOMString，开头有一个`?`
	- `location.hash`：包含块标识符的一个DOMString，开头有一个`#`
	- `location.host`：包含了域名的一个DOMString，可能在该串最后带有一个`:`并跟上URL的端口号
	- `location.hostname`：包含了URL域名的一个DOMString
	- `location.pathname`：包含URL中路径部分的一个DOMString，开头有一个`/`
	- `location.protocol`：包含了URL对应协议的一个DOMString，最后有一个`:`
	- `location.port`：包含了端口号的一个DOMString
* 跳转操作
	- `location.assign(url)`
	- `location.href=''`
	- `location= '' `
	- `location.replace(url)`
		* 与`assign`的区别：不生成历史记录
	- `location.reload([Boolean])`
		* 传递`true`，则强制清空缓存，并刷新页面

### `History`对象
* 表示当前窗口的浏览历史
* `window.history` → `History`对象，保存了当前窗口访问过的所有页面
	- 由于隐私原因，其中的页面仅在当次访问时有效，具体网址不能获取
* 前进与后退：`history.forward()` `history.back()`
* 访问特定页面：`history.go()` ，正数向前跳转，负数向后跳转
* `history.length`是当次访问的链接数量

[^1]: https://dom.spec.whatwg.org/
