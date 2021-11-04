# 文件输入输出
## 文件I/O基础
### 文件系统
* 程序与文件系统交互方式的不规则性是文件I/O漏洞的根源
	1. 操作系统、文件系统众多
	2. 每种操作系统能支持多种文件系统、文件I/O接口
* 不同的文件系统

=== "UNIX"
    * 大多使用UFS（UNIX File System）
	* 很多厂商都改写过UFS，增加了一些专有扩展

=== "Linux"
	* 早期：MINIX、MS-DOS、ext2
	* 较新：ext4、日志文件系统(Journal File System, JFS)和ReiserFS等
	* 加密文件系统(Cryptographic File System, CFS)和虚拟文件系统

=== "Mac OS X"
	* HFS+（Hierarchical File System Extended Format，分层文件系统扩展格式）、UPS（BSD标准文件系统格式）、NFS（Network File System，网络文件系统）、AFP（AppleTalk文件协议[Mac OS文件共享]）、UDF（Universal Disk Format，通用磁盘格式）、……

* 文件：由块(通常在磁盘上)的集合组成
	- UFS的块由与文件关联的i节点(i-node)管理
	- MS-DOS 8.3文件名
		* 用路径(path)名来代替一个文件名
		* 路径名包含文件、目录的名称，以及如何浏览文件系统来找到该文件的信息
		* 路径名区分绝对路径名和相对路径名，多个路径名可以解析到同一个文件

		```text
		/home/myhome/.login
		  ↓      ↓      ↓
		目录名  目录名  文件名
		```

* 目录：由目录条目的列表组成的特殊文件
	- 目录条目的内容包括目录中的文件名和相关的i-节点的数量

### 文件I/O接口

=== "C语言中的接口"
	- 定义在`<stdio.h>`中
	- I/O操作的安全性依赖于具体的编译器实现、操作系统和文件系统
	- 较旧的库容易遭受攻击

	???+ info "C语言I/O接口"
		1. 字节输入函数：`fgetc()`、`fgets()`、`getc()`、`getchar()`、`fscanf()`、`scanf()`、`vfscanf()`、`vscanf()`
		2. 字节输出函数：`fputc()`、`fputs()`、`putc()`、`putchar()`、`fprintf()`、`vfprintf()`、`vprintf()`
		3. 宽字符输入函数：`fgetwc()`、`fgetws()`、`getwc()`、`getwchar()`、`fwscanf()`、`wscanf()`、`vfwscanf()`、`vwscanf()`
		4. 宽字符输出函数：`fputwc()`、`fputws()`、`putwc()`、`putwchar()`、`fwprintf()`、`wprintf()`、`vfwprintf()`、`vwprintf()`

	- 文本流

		* 标准C程序启动时，预定义了三个文本流，操作前不必打开它们，它们都是`FILE*`指针类型表达式

			- `stdin`：标准输入(用于读常规输入)

			- `stdout`：标准输出(用于写常规输出)

			- `stderr`：标准错误(用于写入诊断输出)

		* 打开、关闭文件

        === "`fopen`"

            `FILE *fopen(const char* restrict filename, const char* restrict mode);`

            :    以指定模式打开一个文件，并将其与流关联

            === "`mode`取值(C99)"

                `r`
                :    打开文本文件进行读取（只读文件）

                `w`
                :    截断至长度为零或创建文本文件用于写入

                `a`
                :    追加、打开或创建文本文件用于在文件结束处写入

                `rb`
                :    打开二进制文件进行读取

                `wb`
                :    截断至长度为零或创建二进制文件用于写入

                `ab`
                :    追加、打开或创建二进制文件用于在文件结束处写入

                `r+`
                :    打开文本文件用于更新(读取与写入)

                `w+`
                :    截断至零长度或创建文本文件用于更新

                `a+`
                :    追加;打开或创建文本文件用于在文件结束处更新和写入

                `r+b或rb+`
                :    打开二进制文件用于更新(读取与写入)

                `w+b或wb+`
                :    截断至长度为零或创建二进制文件用于更新

                `a+b或ab+`
                :    追加、打开或创建二进制文件用于在文件结束处更新和写入

            === "独占模式(C11新增)"

                ??? info "独占模式"

                    使用任何一种独占模式打开已存在或者不能被创建的文件都会失败。否则，文件会以独占(不共享)访问模式被创建

                `wx`
                :    创建独占文本文件用于写入

                `wbx`
                :    创建独占的二进制文件用于写入

                `w+x`
                :    创建独占的文本文件用于更新

                `w+bx 或wb+x`
                :    创建独占的二进制文件用于更新

                !!! info "关于`restrict`关键字"

                    C99标准引进，属于类型修饰符，表示修饰的这块内存空间只能被这个指针引用和修改，除此之外别无他法。程序员需要保证使用`restrict`修饰的两个指针不指向同一数据，方便编译器进行优化。

        === "`fclose`"

            `int fclose(FILE *stream);`

            :   关闭文件流

                * 任何未写入的缓存数据流被传递到主机环境，并被写入到该文件中。任何未读的缓存数据将被丢弃
                * 关闭的文件可能随后被相同或另一个程序的执行重新打开，并且其内容被回收或修改

=== "C++中的接口"

	- C++中提供与C相同的系统调用和语义，只有语法是不同的。

		* C++的`<ostream>`库包括了`<cstdio>`，后者是`<stdio.h>`的C++版本。因此，C++支持所有的C的IO函数调用以及`<iostream>`对象。
		* C++中的文件流
			- 不使用`FILE *`
			- 继承自`fstream`的`ifstream`处理基于文件的输入流，`ofstream`处理基于文件的输出流，`iofstream`同时处理输入和输出的文件流
			- `wchar_t`类型的宽字符I/O：使用`wofstream`、`wifstream`、`wiofstream`、`wfstream`处理
		* C++中的标准流
			- `cin`取代`stdin`用于标准输入
			- `cout`取代`stdout`用于标准输出
			- `cerr`取代`stderr`用于无缓冲标准错误
			- `clog`用于缓冲标准错误，缓冲区满或者遇到`endl`时才输出在屏幕上
			- 对于宽字符流(`wchar_t`)，使用`wcout`、`wcin`、`wcerr`、`wclog`

		```c++ linenums="1" hl_lines="2 8-9 13"
		/* 从一个文件test.txt中读取字符数据，并将其写入到标准输出 */
		#include <iostream>
		#include <fstream>

		using namespace std;

		int main(void) {
			ifstream infile;
			infile.open("test.txt",ifstream::in);
			char c;
			while (infile >> c)
				cout << c;
			infile.close();
			return 0;
		 }
		```

## 文件访问控制
### UNIX文件权限

!!! info "辨析：特权与权限"
	* 特权(privilege)是通过计算机系统委派的权限，特权位于用户、用户代理或替代，如UNIX进程中。是相对主体而言的。
	* 权限(permission)是访问资源所必要的特权，因此它与资源(如文件)相关。是相对客体而言的。

* UNIX用户与认证
	- UID+用户名：用户标识
		* 这个映射关系被保存在`/etc/passwd`文件中
		* 超级用户（root）的UID为0，它可以访问任何文件
	- 每一个用户属于一个组，组号用GID表示
	- 用户提供自己的用户名和密码给UNIX系统作身份验证。login程序检查`/etc/passwd`或shadow文件`/etc/shadow`来确定用户名是否对应到该系统上的有效用户，并检查提供的密码是否与该UID所关联的密码对应。
* 文件的特权与权限
	- UNIX文件系统中的每个文件都有一个所有者(UID)和一个组(GID)。所有权用于决定了哪些用户和进程可以访问文件，所有权属于文件的所有者或root，这种特权不能被委派或共享
	- 权限：读(r，读一个文件或列出一个目录的内容)、写(w，写入到一个文件或目录)、执行(x，执行一个文件或递归一个目录树)
		* 权限表示：八进制向量（用户||组||其他）。其中每个分量中，r=4，w=2，x=1
		* 例如：755表示该文件所有者被授予读、写和执行权限；与所有者处于同组成员的用户和其他用户被授予读取和执行权限
	- 可对这些用户组授予或撤销权限：用户(u，该文件的所有者)、组(g，属于文件的组成员的用户)、其他(o，不属于前两种情况的用户)
* 文件的访问控制
	- 当访问一个文件时，进程的有效用户ID(Effective User ID, EUID) 与文件所有者的UID进行比对。如果该用户不是所有者，那么再对GID进行比较，然后再测试其他

### 进程特权
* 进程用户ID

    === "RUID"
        实际用户ID(Real User ID，RUID)：RUID是启动该进程的用户的ID，它与父进程的用户ID是相同的，除非它被改变。

    === "EUID"
        有效用户ID(Effective User ID，EUID)是由内核检查权限时，使用的实际ID，因此它确定了进程的权限。如果新的进程映像文件的设置用户ID模式位被设置，则新进程映像的EUID被设置为新进程映像文件的用户ID。

    === "SSUID"
        保存的设置用户ID(Saved Set-User-ID，SSUID)是执行时设置用户ID程序的进程映像文件的所有者ID。

* 进程组ID

    === "RGID"
        实际的组ID(Real Group ID, RGID)是调用该进程的用户的主要组ID

    === "EGID"
        有效组ID(Effective Group ID, EGID)，这是一个由内核检查权限时使用的GID。EGID用于与补充组ID连用。

    === "SSGID"
        保存的设置组ID(Saved Set-Group-ID，SSGID)是执行时设置组ID程序的进程映像文件的所有者的GID。

    === "SGID"
        每个进程都维护一个组列表，称为补充组ID(supplementary group ID)，进程在其中有成员关系。当内核检查组权限时此列表用于EGID。

* 进程的实例化过程
	- 由C标准`system()`调用，或由POSIX的`fork()`和`exec()`系统调用从父进程继承RUID、RGID、EUID、EGID、补充组ID，以实例化进程。
	- 保存的设置用户ID能力允许程序恢复在最后一次`exec()`调用时建立的EUID。否则，一个程序必须以root身份运行才能执行相同的功能。同样地，保存的设置组ID功能允许一个程序恢复在最后一次`exec()`调用时建立的有效组ID
	- 若要永久放弃特权，则在调用`exec()`之前把EUID设置为RUID，以使提升的特权不传递给新程序。
* 更改特权——漏洞的利用根源之一
	- 一个提升过权限的访问用户文件或共享目录的进程很有可能成为利用的目标，这个权限可以通过将EUID设置为RUID撤销
	- 对于依赖于一个不同的访问控制机制的文件系统，这种方式仍然可能导致不安全的程序
	- 例子：OpenSSH特权提升漏洞

		```c linenums="1" hl_lines="2-3"
		/* 以root 特权运行，但并不总是在打开文件之前删除特权 */
		fname = login_getcapstr(lc, "copyright",NULL,NULL);
		if(fname != NULL && (f = fopen(fname,"r")) != NULL) {
			while (fgets(buf, sizeof(buf), f) != NULL)
				fputs(buf,stdout);
			fclose(f);
		}
		```

		* 此漏洞允许攻击者通过在用户的 `~/.login_conf` 文件中指定配置选项来读取文件系统中的任何文件，例如：`copyright=/etc/shadow`

* 管理特权：`setuid`程序，`setgid`程序
	- setuid程序：执行时设置用户ID位
    - setgid程序：执行时设置组ID位
	- 不是所有调用`setuid()`或`setgid()`的程序都是setuid或setgid程序。setuid程序可以以root身份运行(set-user-ID-root设置用户ID为root)或以更受限制的特权运行。
	- 非root的setuid和setgid程序通常用于执行有限或特定的任务。这些程序只限于把EUID更改为RUID和SSUID。在可能的情况下，系统应采用这种方法设计，而不是创建设置用户ID为root的程序。
	- 例子
		* passwd、ping程序：setuid程序，设置UID（具体来说，是EUID）为root的程序
			- `ls -l`命令的结果是`-r-sr-xr-x 1 root bin [...] `

				!!! info "s的含义"
					拥有与该用户相同ID的用户才有执行权，可以通过`chmod u+s filename`获取这个权限（设置suid）
					有关s标志的扩展资料[^1]

	- 小心使用setuid程序
		* 确保对不受信任的用户不采取行动，并确保不给不受信任的用户返回特权信息
		* 对一些本地可利用的漏洞负责
		* 不再需要root权限时把EUID变更为RUID

## 文件鉴定
### 目录遍历
* 特殊文件名
	- "."指目录本身
	- ".."指的是目录的父目录，".."在根目录中可能指的是根目录本身
	- 在Windows系统上，还可能提供驱动器盘符(例如C:)，以及其他特殊文件名，如"…"，它相当于"../.."
* 目录遍历漏洞
	- 没有进行足够的验证的路径名会导致目录遍历漏洞
	- 接受"../"形式的输入而没有适当的验证，会允许攻击者遍历文件系统来访问任意文件
		* 例如，`/home/../etc/shadow`会被解析为`/etc/shadow`
	- 许多特权应用程序利用合并用户提供的数据动态地构建路径名
		* 例如作为特权进程执行的一段代码
			```c linenums="1" hl_lines="1-3"
			const char *safepath = "/usr/lib/safefile/";
			size_t spl = strlen(safe_path);
			if (!strncmp(fn, safe_path, spl) {
				process_libfile(fn);
			}
			else abort();
			```

			如果该程序所需的文件名参数fn来自非受信的来源(如用户)，那么攻击者可以提供如下的文件名来绕过这些检查：
			```text
			即令fn="/usr/lib/safefile/../../../etc/shadow"
			```

* 净化机制：不靠谱的机制
	- 用于删除一个目录遍历攻击的特殊文件名，如"."和"../"
	- 然而，攻击者仍然可以绕过此机制
		* 向文件名中注入"."，当净化过后，就会产生有效的文件名
		* 双写净化字符，净化一次后，恰好构成攻击条件
			- 如净化机制`path = replace(path,"../","");`，攻击者可以令path为"....//"来绕过

### 等价错误
* 当一个攻击者提供不同但等效名字的资源来绕过安全检查时，就会发生路径等价漏洞
	- 常常被忽视，比如 `"<a href='#'>http://host/./admin/</a>" == "<a href='#'>http://host/admin/</a>"`
* 大小写问题
	- 来自于Apache和Macintosh HFS+的不统一的大小写问题：CVE-2004-1084
		* HFS+不区分大小写，而Apache目录访问控制区分（它是为UFS设计的），访问"/home/PRIVATE"可能会访问到"/home/private"目录，导致访问控制被绕过
		* 分支泄露的问题，以下访问方式可能在能够识别数据分支的操作系统上绕过访问控制
			- `sample.txt/..namedfork/rsrc`，用于访问资源分支
			- `sample.txt/..namedfork/data`，用于访问数据分支
* 其他错误
	- 前导或尾随空白
	- 前导或尾随文件分隔符
	- 内部空格(例如`file name`)或星号通配符(例如`pathname*`)

### 符号链接
* 符号链接(symbolic link)是一个方便的解决文件共享的方案，本质是包含了实际文件的路径名的一个独特的i-节点(i-node)文件
* 符号链接操作：如果路径名称解析过程中遇到符号链接，则用符号链接的内容替换链接的名称。
	- 比如一个路径名`/usr/tmp`，其中`tmp`是一个指向`../var/tmp` 的符号链接，则它被解析为`/usr/../var/tmp`，这进一步被解析为`/var/tmp`
* 链接文件的接口（在链接本身操作）
	- `int unlink(const char *pathname)`删除符号链接文件
	- `int lstat(const char *path, struct stat *buf)`返回符号链接文件的有关信息
	- `int lchown(const char *pathname, uid_t owner, gid_t group)`更改符号链接文件的用户和组
	- `int readlink(const char * path, char * buf, size_t bufsiz)`读取指定的符号链接文件的内容
	- `int rename(char *oldname, char *newname)`重命名oldname参数指定的符号链接，或重写newname参数到指定的一个符号链接文件
* 例子：某setuid程序的部分代码，它以root用户权限运行
	```c
	fd = open("/home/rcs/.conf"，O_RDWR);
	if (fd < 0) abort();
	write(fd,userbuf,userlen);
	```

	- 假定攻击者可以控制在`userbuf`中存储，并在`write()`的调用中写入的数据
		* 攻击者创建一个从`.conf`到`/etc/shadow`认证文件的符号链接：
		```shell
		cd /home/rcs
		ln -s /etc/shadow .conf
		```
		* 然后运行有漏洞的程序，它以root身份打开文件进行写入，并把攻击者控制的信息写入到密码文件
			- 这种攻击可以用于创建一个新的、没有密码的root账户。然后，攻击者可以使用`su`命令切换到root账号进行root访问


## 竞争条件
* 例子：GNU 实用文件工具（4.1版）中的竞争条件
	```shell
	...
	chdir("/tmp/a");
	chdir("b");
	chdir("c");
	// 竞争窗口
	chdir("..");
	rmdir("c");
	unlink("*");
	...
	```

	- 这段代码依赖于一个路径为`/tmp/a/b/c` 的目录存在。正如注释所指出，竞争窗口在第4行和第6行之间。如果在这个竞争窗口期间执行以下shell命令，则会构成一个利用：`mv /tmp/a/b/c /tmp/c`
	- 编写这段代码的程序员假定，第6行会将当前目录设置为`/tmp/a/b`。然而，如果利用代码成功执行，那么第6行的执行会将当前目录设置为`/tmp`。当代码继续执行到第8行时，也许会在无意之中删除文件。如果这个进程是以root或其他较高的权限执行的，这就特别危险。

### 检查时间和使用时间（TOCTOU）
- 文件I/O期间可能出现检查时间和使用时间(Time Of Check Time Of Use ,TOCTOU)竞争条件。首先测试(检查)某个竞争对象属性，然后再访问(使用)此竞争对象，TOCTOU竞争条件形成一个竞争窗口。
- TOCTOU漏洞可能是首先调用`stat()`，然后调用`open()`，或者它可能是一个被打开、写入、关闭，并被一个单独的线程重新打开的文件，或者它也可能是先调用一个`access()`，然后再调用`fopen()`

	```c linenums="1" hl_lines="7-9"
	#include <stdio.h>
	#include <unistd.h>

	int main(void) {
		FILE *fd;

		if (access("a_file",W_OK) == 0) {
			puts("access granted.");
			fd = fopen("a_file","wb+");
			/* 写入文件 */
			fclose(fd);
		}
	...
	return 0;
	}
	```

	* 在这段代码中的竞争窗口很小，只是在文件已经通过调用`access()`测试之后，但在打开它之前的第7~9行之间的代码。在那段时间里，一个外部进程有可能在竞争窗口中用某特权文件的符号链接来取代a_file。例如，这可以由一个单独的(非受信)用户在竞争窗口中执行以下shell命令实现：
		```shell
		rm a_file
		ln -s /etc/shadow a_file
		```

- 例子：打开文件时有TOCTOU漏洞的代码
	```c++ linenums="1" hl_lines="8 12"
	#include <iostream>
	#include <fstream>
	using namespace std;

	int main(void) {
		char *file_name /* = 初始值 */;

		ifstream fi(file_name);  // 尝试作为输入文件打开
		if(!fi) {
			// 文件不存在，所以它是安全的[原文]
			// 创建并写入它
			ofstream fo(file_name);
			// 写入到file_name;
			// 其他操作
		}
		else {  //文件存在，关闭并处理错误
			fi.close();
			// 处理错误
		}
	}
	```

	* 漏洞原因是在第8行测试文件的存在和第12行的打开文件都使用文件名，可以通过在执行8行和12行之间的过程中的竞争窗口创建一个具有相同文件名的符号链接来利用其漏洞

### 创建而不替换

```c
/* 下面的代码使用POSIX open()函数打开一个文件用于写入 */
char *file_name;
int new_file_mode;
/* 初始化 file_name 和 new_file_mode */

int fd = open(
	file_name, O_CREAT | O_WRONLY,  new_file_mode
);
// int fd = open(file_name, O_CREAT | O_EXCL | O_WRONLY,  new_file_mode);

if (fd == -1) {
 /* 处理错误 */
}
```

- 如果在`open()`调用执行时`file_name`已经存在，那么打开该文件，并截断它。如果`file_name`是一个符号链接，那么该链接引用的目标文件被截断。攻击者所有需要做的事就是在此调用之前在`file_name`创建一个符号链接。假设这个有漏洞的过程有相应的权限，那么目标文件将被覆写。
- 使用`open()`函数的一个解决方案是使用`O_CREAT`和`O_EXCL`标志。在一起使用这些标志时，它们指示如果`file_name`中指定的文件已经存在，那么`open()`函数就会失败。
	* 检查文件的存在并在它不存在时创建文件，这相对于其他正在对同一个目录中相同名称的文件名执行设置`O_EXCL`和`O_CREAT`的`open()`的线程是原子的。
	* 如果设置了`O_EXCL`和`O_CREAT`，且`file_name`是一个符号链接，那么不管符号链接的内容是什么，`open()`都会失败，并把`errno`设置为`EEXIST`
	* 如果设置了`O_EXCL`但未设置`O_CREAT`，那么结果是不确定的。
	* 对远程文件系统使用`O_EXCL`时应小心，因为它不能在NFS版本2上工作。NFS 版本3 中增加了对`O_EXCL`模式的`open()`的支持

### 独占访问
- 锁机制：把文件当作锁使用
	```c linenums="1" hl_lines="6-7 9"
	/* 简单Linux文件锁机制实现。对lock()的调用用于获得锁，而对unlock()的调用则可以释放锁 */
	/* 锁文件(lock file)用作锁的代理。如果文件存在，则锁被获得；如果文件不存在，则锁被释放 */
	int lock(char *fn) {
		int fd;
		int sleep_time = 100;
		while (((fd = open(fn, O_WRONLY | O_EXCL |
		   O_CREAT, 0)) == -1) && errno ==EEXIST)  //open()函数不会阻塞。因此，lock()函数必须反复调用open()函数，直到可以创建文件为止。这种重复有时称为忙等(busy form of waiting)或自旋锁(spinlock)。
		{
			usleep(sleep_time);
			sleep_time *= 2;
			if (sleep_time > MAX_SLEEP)
				sleep_time = MAX_SLEEP;
		}
		return fd;
	}
	void unlock(char *fn) {
		if (unlink(fn) == -1) {
			err(1, "file unlock");
		}
	}
	```

	* 实现缺陷：如果持有锁的进程调用`unlock()`失败，则文件锁将一直被保持。
		- 修补方案：修改`lock()`函数，将锁定进程的ID(PID)写到锁文件中。
			* 当发现一个现有的锁时，新版`lock()`将检查文件中保存的PID，并与活动进程列表进行比较。在锁定文件的进程已经终止的情况下才可以获得锁并更新锁文件以包含新的PID。
			* 风险仍旧存在！
				1. 终止进程的PID 有可能被重用。
				2. 除非非常谨慎地进行实现，否则修补方案可能会包含竞争条件。
				3. 被锁保护的共享资源可能由于进程的崩溃也受到破坏。

### 共享目录
- 当两个或更多用户，或一组用户都拥有对某个目录的写权限时，共享和欺骗的潜在风险比对几个文件的共享访问情况要大得多
- 然而，在共享目录创建临时文件没有完全安全的方式，“众所周知”的文件容易被攻击者利用或操纵
- 综上，使用临时文件函数，它们能够创建不可预见名字的临时文件，并在程序运行结束后及时清除它们

	`独特的并且不可预知的文件名`

	:	临时文件的名称都必须是唯一的(所以它们不与现有的文件名冲突)并且对攻击者是不可预知的。

    `创建而非替换`

	:	仅当此文件不存在时才应建立临时文件。确定该文件是否存在的测试和打开文件必须作为原子操作执行，以消除任何潜在的竞争条件。

    `独占访问`

	:	独占访问给予锁定过程无限制的文件访问，而拒绝所有其他进程访问，并消除锁定区域上潜在的竞争条件。

    `适当的权限`

	:	应该用执行所需操作(通常由文件的所有者读取和写入)的必要权限的最小集合来打开临时文件。

    `终止前删除`

	:	不再需要临时文件时删除它们，允许文件名和其他资源(如辅助存储器)得以回收。

???+ summary "临时文件创建函数比较"

    |  | `tmpnam` | `tmpnam_s` | `tmpfile` | `tmpfile_s` | `mktemp` | `mkstemp` |
    |:---:|:---:|:---:|---|---|---|---|
    | 标准 | C | Annex K | C | Annex K | POSIX | POSIX |
    | 不可预测名字 | 不可移植 | 是 | 不可移植 | 是 | 不可移植 | 不可移植 |
    | 唯一名字 | 是 | 是 | 是 | 是 | 是 | 是 |
    | 创建而不替换 | 否 | 否 | 是 | 是 | 否 | 是 |
    | 独占访问 | 可能 | 可能 | 否 | 如果操作系统支持 | 可能 | 如果操作系统支持 |
    | 适当权限 | 可能 | 可能 | 否 | 如果操作系统支持 | 可能 | 不可移植 |
    | 删除文件 | 否 | 否 | 是 | 是 | 否 | 否 |

## 缓解策略
### 关闭竞争窗口
* 使用同步原语缓解互斥和死锁
* 使用线程安全的函数
* 使用原子操作
* 重新打开文件
	- 一般应避免，但对于长期运行的应用程序，可能是必要的，以避免消耗可用文件描述符。
	- 一个解决方案：检查-使用-检查(check-use-check)模式

        === "检查-使用-检查模式"
            ```c++
            struct stat orig_st;
            struct stat new_st;
            char *file_name;
            /* 初始化file_name */
            int fd = open(file_name, O_WRONLY);
            if (fd == -1) {
                /* 处理错误 */
            }
            /* 写入文件 */
            if (fstat(fd, &orig_st) == -1) {
                 /* 处理错误 */
            }
            close(fd);
            fd = -1;
                /* … */
            fd = open(file_name, O_RDONLY);
            if (fd == -1) {
                /* 处理错误 */
            }
            if (fstat(fd, &new_st) == -1) {
                 /* 处理错误 */
            }
            if ((orig_st.st_dev != new_st.st_dev) || (orig_st.st_ino != new_st.st_ino)) {
               /* 文件被篡改了！ */
            }
            /* 从文件中读取 */
            close(fd);
            fd = -1;
            ```

            * 使用`open()`函数打开该文件。如果成功地打开了文件，则用`fstat()`函数把有关该文件的信息读入到`orig_st`结构。在关闭文件，然后重新打开该文件后，把有关该文件的信息读入`new_st`结构，并对`orig_st`和`new_st`中的`st_dev`和`st_ino`域进行比较，以提高识别的正确性
            * 这使得程序能够识别出一个攻击者是否在第一次`close()`和第二次`open()`之间交换了文件。但是，这个程序不识别该文件是否已被修改

        === "检查符号链接"

            ```c hl_lines="8 12"
            char *filename = /* 文件名 */;
            char *userbuf = /* 用户数据 */;
            unsigned int userlen = /* userbuf 字符串长度 */;

            struct stat lstat_info;
            int fd;

            if (lstat(filename, &lstat_info) == -1) {
                /* 处理错误 */
            }

            if(!S_ISLNK(lstat_info.st_mode)) {
                fd = open(filename, O_RDWR);
                if (fd == -1) {
                    /* 处理错误 */
                }
            }
            if (write(fd, userbuf, userlen) < userlen) {
                /* 处理错误 */
            }
            ```

            - 该示例使用`lstat()`函数来收集有关文件的信息，检查`st_mode`域，以确定该文件是否是一个符号链接，如果它不是一个符号链接，那么打开该文件
            - 但是，在`lstat()`调用和随后的`open()`调用之间包含一个TOCTOU竞争条件，因为这两个函数都对同一个文件名进行操作，而该程序的执行可以对此文件名进行异步操作

        === "检测竞争条件"

            ```c hl_lines="9 13 18 22-24"
            char *filename = /* 文件名 */;
            char *userbuf = /* 用户数据 */;
            unsigned int userlen = /* userbuf 字符串长度 */;

            struct stat lstat_info;
            struct stat fstat_info;
            int fd;

            if (lstat(filename, &lstat_info) == -1) {
                /* 处理错误 */
            }

            fd = open(filename, O_RDWR);
            if (fd == -1) {
                /* 处理错误 */
            }

            if (fstat(fd, &fstat_info) == -1) {
                /* 处理错误 */
            }

            if(lstat_info.st_mode == fstat_info.st_mode &&
                lstat_info.st_ino == fstat_info.st_ino &&
                lstat_info.st_dev == fstat_info.st_dev) {
                if (write(fd, userbuf, userlen) < userlen) {
                    /* 处理错误 */
                }
            }
            ```

### 消除竞争对象
* 消除对系统资源不必要的使用，以尽量减小漏洞的暴露
	- Windows的`ShellExecute()`函数尽管是为打开一个文件提供了便利的方式，但是这个命令依赖于注册表来选择一个将要应用于文件的应用程序。显而易见，调用`CreateProcess()`并显式指定应用程序的做法比依赖注册表更可取。
* 使用文件描述符而非文件名
	- 在一个与文件有关的竞争条件中的竞争对象通常不是文件，而是文件所在的目录
		* 比方说，一个符号链接漏洞利用依赖于改变目录条目或是在目录树中更高层的条目，从而改变文件名所指代的文件。一旦一个文件被打开，只要是通过其文件描述符而非文件名的目录(这是竞争的对象)对其进行访问的，该文件就不易受到符号链接攻击。
	- 通过使用`fchown()`代替`chown()`、使用`fstat()`代替`stat()`、使用`fchmod()`代替`chmod()`，可以消除很多与文件有关的竞争条件。
	- 必须小心使用那些不接受文件描述符的POSIX 函数，包括`link()`、`unlink()`、`mkdir()`、`rmdir()`、`mount()`、`umount()`、`lstat()`、`mknod()`、`symlink()`以及`utime()`等，并且将它们视作产生竞争条件的潜在威胁。
	- Windows中仍有可能存在与文件有关的竞争条件，不过概率小得多，因为WindowsAPI鼓励使用文件句柄而非文件名

### 控制对竞争对象的访问

=== "最小特权原则"
	- 通过减少进程的特权来消除竞争条件
	- 攻击者借以使受害代码执行本来没有(也不应该有)权限执行的函数
	- 当一个进程必须使用高级特权时，在获取对共享资源的访问前应该使用POSIX 特权管理函数或者`CreateRestrictedToken()`或`AdjustTokenPrivileges()`(Windows)来去除这些特权
	- 当创建了一个文件后，应该将权限限制为该文件的所有者(若有必要，稍后可以通过文件描述符调整文件的权限)。某些函数，如`fopen()`和`mkstemp()`，要求首先调用`umask()`来建立创建权限

=== "暴露问题"
	- 避免通过用户接口或其他的API暴露你的文件系统的目录结构或文件名
	- 让用户指定一个键作为标识符，然后映射到文件系统中一个特定的文件

=== "安全目录"
	- 保证文件操作在安全目录中执行
	- 用以检验文件访问权限的算法必须检查的东西不仅仅包括文件自身的权限，还包括从父目录开始，向上至文件系统根目录的每一个包含目录的权限

=== "容器的虚拟化"
	- 容器提供轻量级的虚拟化技术，隔离进程和资源，而不需要提供指令解释机制和其他完全虚拟化的复杂性

### 竞争检测工具

=== "静态分析"
	- 对软件源代码(或者，在某些情况下，二进制执行文件)进行解析，这种解析有时依赖于用户提供的搜索信息和准则。静态分析工具能报告那些显而易见的竞争条件，有时还能根据可察觉的风险为每个报告项目划分等级。
	- 竞争条件侦测已经被证明是一个NP 完备问题[Netzer 1990]，所以静态竞争侦测工具给出的判断都是近似的。误报或漏报一定存在

=== "动态分析"
	- 将侦测过程与实际的程序执行相结合，克服了静态分析工具存在的一些问题。这种方式的优势在于可以使工具获得真实的运行时环境。只分析实际的执行流具有一个额外的好处，即可以减少必须由程序员进行分析的误报情况。
	- 动态工具无法侦测未执行到的路径
	- 动态检测通常会带来巨大的运行时开销

[^1]: https://blog.csdn.net/Fly_as_tadpole/article/details/81257463
