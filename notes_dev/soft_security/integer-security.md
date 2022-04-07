---
tags:
  - 软件安全
---
# 软件安全——整数安全

## 整数的三种表示方法

=== "原码"
	- 利用最高位表示数的符号，最高位0为正，1为负，剩下的低位表示值的大小

=== "反码"
	- 将一个整数值的每一位取反，得到其对应的负数
	- “0”有两种：+0（00000000），-0（11111111）

=== "补码"
	- 正数与原码相同，负数在其反码表示法的结果末位+1
	- “0”只有一种：+0（00000000）

## 整数和类型
### 整数的范围
* 带符号数的范围（所占位数大小n）：$-2^{n-1} \sim 2^{n-1}-1$
* 无符号数的范围（所占位数大小n）：$0 \sim 2^{n-1}$
### 整数类型
- 标准整型

	| 类型 | 所占空间 |
	| :--: | :--: |
	| `signed char` | 1字节 |
	| `short int` | 2 |
	| `int` | 2（16位系统）/4（32位系统） |
	| `long int` | 4（16位系统）/8（32位系统） |
	| `long long int` | 8 |

- 扩展整型
	* 由具体实现定义的类型：宽度相关
	> `int#_t`,`uint#_t` `int_least#_t`,`uint_least#_t`等
	* 平台相关的整型
	> Windows API带有`__int8` `__int16` `__int32` `__int64`等整型定义

??? summary "一个整数类型的最大值和最小值取决于"
	1. 该类型的表示法
	2. 是否带符号
	3. 分配的内存位数大小

### 整型转换

!!! note
	在C和C++中，类型转换可能显式或隐式发生。

- 整型提升
	* 比`int`小的整型进行操作时，它们会被：
		- 转换为一个`int`
		- 或者转换为一个`unsigned int`

        !!! faq "例子"
            ```c
            char c1,c2;
            c1 = c1 + c2;
            ```

            - `c1`,`c2`都会被提升至`int`，结果会进行截断

	!!! info "这样做的意义"
		防止运算过程中中间结果发生溢出而导致算术错误

- 整数转换级别
	* 低精度的带符号整型的级别比高精度的带符号整型类型的级别低
	* 无符号整型的级别与对应的带符号整型的级别相同
	* 相互转换

		=== "无符号 → 无符号"
			* 小 → 大：对值零扩展，绝对安全
			* 大 → 小：较大值会被截断，低位值保留

		=== "无符号 → 带符号"
			* 小 → 大：没有数据丢失，最高位变为符号位
			* 大 → 小：符号位若被置位，该数的大小和符号都会改变

		=== "带符号 → 带符号"
			* 小 → 大：值不会变化，但要做符号扩展
			* 大 → 小：截断高位

		=== "带符号 → 无符号"
			* 最高位会失去符号位的功能
			* 值非负不会有很大变化，值为负原值则会变为一个非常大的带符号整数

		!!! info "符号扩展"
			对非负数是零扩展，否则是1扩展

		!!! info "何为截断"
			保留低位，去掉高位。

	!!! summary "一些整数转换级别的排序（若A > B，则表示A的级别比B高）"
		`long long int > long int > int > short int > signed char`

- 普通算术转换

	??? note "具体方法（点击展开）"
		1. 如果两个操作数具有同样的类型，则不需要进一步的转换。
 		2. 如果两个操作数拥有同样的整型（带符号或无符号），具有较低整数转换级别的类型的操作数会被转换到拥有较高级别的操作数的类型。
		3. 如果具有无符号整型操作数的级别大子或等于另一个操作数类型的级别，则带符号整型操作数将被转换为无符号整型操作数的类型。
		4. 如果带符号整型操作数类型能够表示无符号整型操作数类型的所有可能值，则无符号整型操作数将被转换为带符号整型操作数的类型。
		5. 否则，两个操作数都被转换为与带符号整型操作数类型相对应的无符号整型。

- 转换例子

    ```c linenums="1" hl_lines="1 3"
	unsigned int num = ULONG_MAX;
	char c = -1;
	if (c == num) {  /* (1) */
		// codes...
	}
	```

    1. 由于整型提升，`c`被提升为无符号整数，其值为`0xFFFFFFFF` 或 `4294967295`，从而这里可以执行！

    !!! tip "启示"
        当处理值可能会大于`127`（`0x7F`）的字符数据时，对于涉及的字符缓冲区、指针，最好用`unsigned char`代替`char`或`signed char`

### 其他C99整数类型
- `ptrdiff_t`为表示两指针相减的结果的带符号整型
- `size_t`是表示`sizeof`操作符结果的无符号整型。
- `wchar_t`的取值范围可以表示所支持的本地化环境中最大扩展字符集中的所有字符代码

## 整数错误
### 溢出
- 整数被增加超过其最大值或被减小小于其最小值时即会发生整数溢出

	!!! note
		前者为“上溢”，后者为“下溢”。

```c linenums="1" hl_lines="1 2"
int i;
unsigned int j;

i = INT_MAX;  // (1)
i++;
printf("i = %d\n", i);  // (2)

j = UINT_MAX; // (3)
j++;
printf("j = %u\n", j);  // (4)

i = INT_MIN; // (5)
i--;
printf("i = %d\n", i); // (6)

j = 0;
j--;
printf("j = %u\n", j); // (7)
```

1. 2147483647
2. `i = -2147483648`
3. 4294967295
4. `j = 0`
5. -2147483648
6. `i = 2147483647`
7. `j = 4294967295`

### 符号错误
* 带符号整型 → 无符号整型：带符号整数为负的，则变为很大的正值
* 无符号整型 → 带符号整型：无符号整数最高位被设置（为1），变为负值
* 例子

    ```c
	int i = -3;
	unsigned short u;
	u = i;     // (1)
	printf("u = %hu\n", u);  // (2)
	```

    1. 隐式转换为较小的无符号整数
    2. u = `65533`

### 截断错误
- 将较大整型转换为较小整型，原值超过较小类型的范围
- 例子

    ```c
	char cresult,c1,c2;
	c1 = 100;
	c2 = 90;
	cresult = c1 + c2; /* (1) */
	```

    1. $190\gt 127$ ，超过`signed char`的范围（+127），截断错误！

### 错误侦测
#### 通过硬件
* IA-32 加法指令： `add destination, source`
	- 加法指令在标志寄存器中设置标志：溢出标志（带符号溢出）、进位标志（无符号溢出）
	- 两个`signed char`相加，它们的值发生符号扩展
	- 两个`unsigned char`相加，它们的值会发生零扩展
	- 两个`unsigned int`相加，它们为signed int的值生成相同的代码
	- 两个`long long int`相加，add指令先把它们的低32位相加，然后使用adc指令把高位上的32位和进位标志位的值相加
* IA-32 减法指令： `sub（减法） sbb（带借位减法）`
	- 加法指令在标志寄存器中设置标志：溢出标志（带符号溢出）、进位标志（无符号溢出）
	- 两个`long long int`相减，sub指令先把它们的低32位相减，然后使用sbb
* IA-32 乘法指令：`mul（无符号乘） imul（带符号乘）`
	- 无符号乘伪代码

        ```c
		if (OperandSize == 8) { //(1)
			AX = AL * SRC;
		}else {
			if (OperandSize == 16) { //(2)
				DX:AX = AX * SRC;
			}
			else {  // OperandSize == 32
				EDX:EAX = EAX * SRC;  //(3)
			}
		}
		```

        1. 8位操作数，存储在16位的目的寄存器中
        2. 16位操作数存储在32位目的寄存器中
        3. 32位操作数存储在64位目的寄存器中

    - 进位标志和整数溢出标志：如果需要高位来表示两个操作数的积，则进位标志和溢出标志都被置位
	- 字符乘法
		* 不管`char`是否带符号， g++对`char`类型的整数都使用`mul`指令的字节形式
	- 整数乘法
		* g++对单字长度的整型，则采用`imul`指令，不管该类型是否带符号

* IA-32 除法指令：`div（无符号除） idiv（有符号除）`
	- Intel除法指令`div`和`idiv`没有设置整数溢出标志！
* 无符号整数溢出检测：`jc/jnc`，带符号整数溢出检测：`jo/jno`；根据做不同位数运算放在不同命令之后

	!!! info
		做32位运算时，放在指令add之后；
		做64位运算时，放在指令adc之后

#### 先验条件
* 先执行检查

!!! summary "溢出的先验条件"

    === "加法"
    	- 对于两个无符号数而言，加法操作的左操作数（left-hand side, LHS）和右操作数（right-hand side, RHS）的和大于UINT_MAX（对于int相加而言）或大于UL LONG_MAX（对于unsigned long long相加而言），会发生整数溢出。
    	- 对于两个有符号数而言，只有两个同符号数相加才可能溢出，具体来说：
    		1. 正数 + 正数：INT_MAX – LHS < RHS
    		2. 负数 + 负数：LHS < INT_MIN – RHS

    === "减法"
        - 对于两个无符号整数而言，只需检验是否 LHS < RHS。
        - 对于两个有符号数而言：
            * 具有相同符号的两个数不会发生异常情况。
            * 具有不同符号的两个数，如果LHS为负，而RHS为正，对signed int类型检查LHS >= INT_MIN + RHS；如果LHS非负，且RHS为负，检查LHS <= INT_MAX + RHS。

    === "乘法"
        将两个操作数放到下一个更大的数据类型上，然后相乘。

        - 对于无符号整数，检查下一个大整数的高阶位，如果被设置了，抛出错误。
        - 对带符号整数，如果结果的高半部分及低半部分的符号位全为0或1，则没有发生整数溢出。

    === "除法"
        可以通过检查分子是否为整型的最小值以及检查分母是否为-1来防止整型除法溢出的发生。


#### 后验条件
* 先执行运算，后评估结果
	- sum = LHS + RHS（加法）
		* 有符号整数：LHS 非负且sum < RHS，表明发生了溢出；如果LHS为负且sum > RHS，也表明发生了溢出
		* 无符号整数：sum比任意一个操作数小
	- difference = LHS - RHS（减法）
		* 有符号整数：如果RHS非负，并且difference > LHS，则发生了溢出；如果RHS为负，并且difference < LHS，也表明发生了溢出
		* 无符号整数：如果difference > LHS ，则发生溢出
	- product：对于16位（一个字长）带符号整数，可以通过这种方式简化对溢出的检测：将LHS和RHS两个操作数都转型成32位值，并将乘积结果存储到32位的目的域中．如果结果积右移16位和右移15位所得结果不一致，则说明发生了溢出（乘法）

		```c
		/* 一个乘法运算例子 */
		void* AllocBlocks(size_t cBlocks) {
	  		//分配没有 blocks是一个错误
			if (cBlocks == 0) return NULL; 
	 		// 分配足够的内存
			// 把结果提升到一个64-bit的整数
	  		// 检查32-bit UINT_MAX
	  		// 确保没有整数溢出
	 		ULONGLONG alloc = cBlocks * 16;  //这是一个结果是32-bit 值的32-bit 操作。结果被赋值到到一个ULONGLONG，但是计算中可能已经发生了的溢出。
	  		// 正确的做法是ULONGLONG alloc = (ULONGLONG)cBlocks*16;
			return (alloc < UINT_MAX) ? malloc(cBlocks * 16): NULL;
		}
		```

### 漏洞利用

=== "JPEG注释域解析"

    ```c linenums="1" hl_lines="4"
	void getComment(unsigned int len, char *src) {
	   unsigned int size;
	   size = len - 2;
	   char *comment = (char *)malloc(size + 1);    //(1)
	   memcpy(comment, src, size);                  //(2)
       // (3)
	   return;
	}
	int _tmain(int argc, _TCHAR* argv[]) {
	  getComment(1, "Comment "); //(4)
	  return 0;
	}
	```

    1. `len = 1`时，此处将成为`malloc(0)`，也可分配成功
    2. size in memcpy is unsigned int (or unsigned long in 64 bit systems)
    3. 此处的`size`会是一个非常大的正整数，`0xffffffff`
    4. will cause some trouble if `len=1`....

=== "内存分配"

    === "C"
        ```c
    	p = calloc(sizeof(element_t), count);
        ```

    === "C++"
	    ```c++
        p = new ElementType[count];
	    ```

	- 涉及乘法运算，可能会溢出。（实际分配结果小于预期）

=== "符号错误"

    ```c linenums="1" hl_lines="3 5"
	#define BUFF_SIZE 10
	int main(int argc, char* argv[]){
	   int len;                   //(1)
	   char buf[BUFF_SIZE];
	   len = atoi(argv[1]);       //(2)
	   if (len < BUFF_SIZE){
		  memcpy(buf, argv[2], len);
	   }
	}
	```

    1. `len` is signed
    2. `argv[1]` can be negative

=== "截断"

    ```c linenums="1" hl_lines="1-2 5"
	bool func(char *name, long cbBuf) { 		//(1)
		unsigned short bufSize = cbBuf;          //(2)
		char *buf = (char *)malloc(bufSize);
		if (buf) {
			memcpy(buf, name, cbBuf);            //(3)
			if (buf) free(buf);
			return true;
		}
		return false;
 	}
	```

    1. `cbBuf` is `long`, and max is `2147483647`
    2. the range of bufSize(`unsigned short`) is 0~65535 if complier is based on IA-32
    3. `cbBuf` in `memcpy` is `unsigned int` (or `unsigned long` in 64 bit systems)

=== "整数逻辑错误"

    === "负数索引"

        ```c hl_lines="6" linenums="1"
		int *table = NULL;
		int insert_in_table(int pos, int value){
			if (!table) {
			   table = (int *)malloc(sizeof(int) * 100);
			}
			if (pos > 99) {            // (1)
			   return -1;
			}
			table[pos] = value;
			return 0;
		}
		```

        1. 没有检查下界，导致`pos`可负

	=== "类型溢出"

        ```c linenums="1" hl_lines="3-4"
        int main(int argc, char *argv[]) {
           unsigned short int total; //(1)
           total = strlen(argv[1])+
                    strlen(argv[2])+1;  //(2)
           char *buff = (char *)malloc(total);
           strcpy(buff, argv[1]);
           strcat(buff, argv[2]);
        }
        ```

        1. `total` 取值范围0~65535
        2. 可能造成`total`值溢出

#### 具体例子
* NetBSD范围检查漏洞
	- NetBSD 1.4.2及之前的版本中都使用了以下形式的整数范围检查：
		```c
		if (off > len - sizeof(typename))  //sizeof()返回值为size_t，无符号整型
			goto error;
		// off和len都是带符号整型
		```
		* 当`len`小于`sizeof`的返回值时，减法操作造成下溢并产生一个很大的正值，整数范围检查逻辑被绕过
		* 一个替代的检查方案是`if ((off + sizeof(typename)) > len) goto error;`
			- 仍需控制`off`的值，使得加法操作不会溢出
* XDR库
	- 由Sun发布的XDR (external data representation）库中的`xdr_array()`函数包含一个整型溢出
		* 该漏洞已经导致多个应用程序出现可被远程利用的缓冲区溢出，从而可以执行任意的代码
* Windows DirectX MIDI 库
	- `quartz.dll`中包含一个整数溢出漏洞，可以让攻击者执行任意的代码，或使任何使用了这个库的应用程序崩溃，从而导致拒绝服务
		* 该库没有充分验证MIDI文件的MThd区中的音轨(tracks)值的有效性， 一个精心构造的MIDI文件就可以导致整数溢出，进而造成堆内存破坏
* Bash
	- Bash 1.14.6以及更早的版本中存在一个漏洞，会导致任意命令执行
		* bash源代码的`parse.y`模块中的`yy_string_get()`函数内有一个变量声明错误，一个名为`string`的变量被声明为`char *`类型，这个指针取回来的字符被存放在了`int`型的变量中，符号扩展导致十进制代码为255的字符，int变量被赋值为-1。-1又被解析器其他部分用作结束标志。
		* `bash -c 'ls\377who'`将执行两个命令：`ls`和`who`
			- \377表示一个具有十进制值255的单个字符

## 缓解策略
* 范围检查
	Pascal和Ada允许对任何标量类型应用范围限制，以形成子类型。

	=== "Pascal"

		```pascal
		var marks:1 .. 100
		```

	=== "Ada"

		```ada
		type day is new INTEGER range 1..31
		```

	=== "C"

		```c linenums="1" hl_lines="4 7"
		#define BUFF_SIZE 10

		int main(int argc, char* argv[]){
		   unsigned int len;    //(1)
		   char buf[BUFF_SIZE];
		   len = atoi(argv[1]);
		   if ((0<len) && (len<BUFF_SIZE)){  // (2)
			 memcpy(buf, argv[2], len);
		   }else printf("too much data\n");
		}
		```

        1. 隐式的检查：`len`为非负数
        2. 显式的检查：`len`为`0`~`BUFF_SIZE`之间

* 强类型
	- 提供更好的类型定义，有助于编译器更有效地识别与范围相关的问题
	- 抽象数据类型
		* 用户不能直接访问该数据成员
		* 提供类型安全机制

* 检查
	- VC++ Compiler：当一个整数值被赋给较小的整型时， Visual C++ NET 2003编译器会生成一个警告（C4244）
	- VC++ Runtime：/RTC提供了与C4244警告类似的功能，以报告当一个整数被赋值给较小的整型时所导致的数据丢失
	- GCC Runtime：gcc和g++编译器都包含一个`-ftrapv`的编译选项，该选项对检测运行时整数异常提供了有限的支持

* 安全的整数操作
	- C语言兼容库
		* 使用IA-32特定机制侦测整数溢出条件
		* 例子：无符号加

            ```c linenums="1" hl_lines="18-19"
			bool UAdd(size_t a, size_t b, size_t *r) {
			   asm {
				 mov eax, dword ptr [a]
				 add eax, dword ptr [b]
				 mov ecx, dword ptr [r]
				 mov dword ptr [ecx], eax
				 jc  short j1
				 mov al, 1 // (2)
				 jmp short j2
				 j1:
				 xor al, al // (3)
				 j2:
			   };
			}

			int main(int argc, char *const *argv) {
			   unsigned int total;
			   if (UAdd(strlen(argv[1]), 1, &total) &&
				   UAdd(total, strlen(argv[2]), &total)) {    //(1)
					char *buff = (char *)malloc(total);
					strcpy(buff, argv[1]);
					strcat(buff, argv[2]);
				} else {
					abort();
				}
			}
			```

            1. complete check for total length of two strings
            2. `1` is success
            3. `0` is failure

	- `SafeInt`类
		* 是C++模板类，在执行操作之前对操作数的值进行测试，以决定是否会导致错误
		* 例子：

            ```c++ linenums="1" hl_lines="5"
			int main(int argc, char const *argv) {
				try{
					SafeInt<unsigned long> s1(strlen(argv[1]));
					SafeInt<unsigned long> s2(strlen(argv[2]));
					char *buff = (char *) malloc(s1 + s2 + 1);   //(1)
					strcpy(buff, argv[1]);
					strcat(buff, argv[2]);
				}
				catch(SafeIntException err) {
					abort();
				}
			}
			```

            1. 这里的`+`运算符是由`SafeInt`类提供的安全版本，它保证结果无效则抛出一个异常

* 测试
	- 整数漏洞测试应该涵盖所有整型变量的边界条件

* 源代码审计
	- 对整数类型范围进行彻底地检查，根据输入值将被使用的情况检查它们是否被约束在有效范围之内
	- 值不能为负的整数，应直接声明为无符号型，并对上下界进行检查
	- 对所有来自不确定性来源的整数操作，都使用安全整数库完成

*[LHS]: left-hand side，左操作数
*[RHS]: right-hand side，右操作数
