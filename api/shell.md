shell学习

```
#!/bin/sh
a="hello world!"
num=2
echo "a is : $a num is : ${num}nd"
```

运行结果： a is : hello world! num is : 2nd

```
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