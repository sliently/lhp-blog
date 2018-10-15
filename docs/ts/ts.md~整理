# 原始数据类型

javascript的类型分为两种： 原始数据类型和对象类型  
原始数据类型包括：布尔值、数值、字符串、null、undefined以及es6中的新类型`symbol`

----

在ts中有五种可以定义的数值类型,`布尔值`、`数值`、`字符串`、`null`、`undefined`
```ts
let a: boolean = false //需要注意的是new Boolean()返回的不是一个boolean值，是一个boolean对象
let a: number = 123 //可以表示10进制，8进制，2进制等
let a: string = "13123sada"
let u: undefined = undefined;
let n: null = null;
```
##### 空值
javascript中没有空值的概念，在typescript中用`void`表示没有任何返回值的函数
```ts
function a(): void{

}
```
##### 任意值
```ts
let a: any = "asdas" 可以使用任意值
```
**变量如果未指定其类型，那么它会被识别为任意值类型**

## 类型推论
这里需要注意一下
```ts
let a = "1231"
a = 7
// 这种情况下会报错 index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
等价于下面这个
```ts
let a: string = "32131"
a = 7 
// 这种情况下会报错 index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
这就是类型推论，会自己推测出一个对应的值
**如果定义的时候没有赋值，不管之后赋什么类型的值，都不会再报错了**
```ts
let a;
a = "adasd"
a = 787
```
这种情况不会报错，这个地方需要特别注意一下


# 联合类型




