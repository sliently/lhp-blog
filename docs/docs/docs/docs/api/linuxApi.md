linux目录结构（FHS标准）

---

- /boot  启动目录
- /etc   配置文件
- /tmp  程序产生的临时文件
- /home  用户目录
- /lib  库文件
- /bin  可执行文件和常用的linux命令
- /sbin  系统管理员的命令和工具
- /usr  应用程序和文件的安装地
- /mnt  挂接其他系统
- /root  root账户的home目录
- /dev  存放linux系统下的设备文件


> pwd 显示用户当前所处的路径

> ls   [参数][目录名]

1.  -a   列举所有文件，包括隐藏文件
1.  -l    列举目录中细节，包括权限，所有权，组群，大小，创建日期，文件是否链接
1.   -r   逆向，从后往前地列举目录中内容
1.  -R  递归，该选项递归列举当前目录下所有子目录和文件
1.  -s   大小数据块

> 查看文件和目录的命令

```
ls : 列出目录下的清单；
cat: 连接显示文件内容
less/more: 分页显示文件内容，建议使用less，相比于more更方便；
head: 显示文件头部，可指定行数，默认显示10行；
tail: 显示文件尾部，可指定行数，默认显示10行；
file: 显示文件类型；
wc: 查看文件或统计信息；
find: 查找文件或目录（选项比较多，前面有博客专门介绍过）
```

> tab键

```
tab command 用于当你的命令记不全时，输入一部再按一下进行补全，如果有多个前面部分相同命令，则按两次tab键
```

> alias 

```
ubuntu = "ls"用于一个命令去别名
```
> `env` 当前用户的运行环境

> echo $PATH 查看环境变量的路径有哪些

> cmp

```
cmp /bin/ls /bin/dir 
<!--用于比较两个文件是否是完全相同的-->
```
> `cp`复制文件的命令 `mv`移动文件的命令

- -i    互动提示
- -r   复制整个目录，包括子目录和其他
- -v   显示复制进度

```
cp /bin/ls bin/a
```
> touch 创建文本文件（不能插入内容）

> grep  在文件中查找特定的字符串
     money  1.txt   在1.txt中查找包含money的行，区分大小写

