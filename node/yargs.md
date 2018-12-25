# yargs 命令行和Commander 

- usage: 命令行工具的使用方法

- command: 如果需要输入命令，则用 command('命令'，'描述') 的方式标注

- example: 给出使用的例子，用 example('命令'，'描述') 的方式标注

- alias: 对输入参数别名化，比如 -a 和 -A 是等效的

- number(string,boolean,array…): 对输入的参数进行类型转换，比如.array(a), -a 10 4 3 5，那么 ARGV.a 是 [10,4,3,5]

- describe: 对输入参数进行描述，用 describe('参数'，'描述') 的方式标注

- require：标注哪些参数是必备的，比如 a 和 b 的后面加入了 [require] 的描述

- help/epilog: 辅助的帮助/版权信息