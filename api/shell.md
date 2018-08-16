# shell学习

--------

- `#!/bin/bash`在文件开头标识，标识使用什么解析器
- `echo` 输出语句
- `read` 输入语句
- 定义变量不加`$`符号。使用变量加`$`符号 
  如下
```bash
#!/bin/sh
a="hello world!" # 定义一个变量 注意一点a与等号之间不能有空格
echo $a
echo ${a} #使用一个变量，花括号加不加都行
```
------

##### 只读变量 `readonly` 修改可读变量会报错

```bash
#!/bin/bash
name='lhp'
readonly name
```

##### 删除变量 `unset`

```bash
#!/bin/bash
name='lhp'
unset name # unset不能删除只读变量
```

#### 变量类型有以下三种

1. 环境变量  
2. 局部变量
3. shell变量

###### shell字符串支持单引号、双引号 也可以不用引号

```bash
#!/bin/bash
str='name'
```
* 单引号字符串的限制：
    - 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
    - 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

* 双引号的优点：
    - 双引号里可以有变量
    - 双引号里可以出现转义字符

* 反引号
```bash
#!/bin/bash
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
```

#### shell数组
```bash
#!/bin/bash
# 数组名=(值1 值2 ... 值n)

array_name=(value0 value1 value2 value3)

array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
```


读取数组

```bash
${数组名[下标]}
# 使用 @ 符号可以获取数组中的所有元素
echo ${array_name[@]}
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```
### Shell 传递参数

我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数

```bash
#!/bin/bash
echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```


```bash
#{ -n "$var" } : 判断$var变量是否有值
#[ -f "somefile" ] : 判断是否是一个文件
#[ -x "/bin/ls" ] : 判断/bin/ls是否存在并有可执行权限
#[ "&a" = "$b" ] : 判断$a和$b是否相等
[ -f "/etc/shadow" ] && echo "This computer uses shadow passwords"
if [ -f "/etc/shadow" ];then
echo "电脑密码使用隐藏字符"
else
echo "并没有"
fi
```

- 传递到脚本的参数的个数：$#
- -ge 检测左边的数是否大于等于右边的,如果是,则返回 true