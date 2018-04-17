# ajax封装
>  今天的话题是ajax封装 2018.04.17

------------
## 前提
在学习ajax封装之前，我用过几个有关ajax的库，其中包括jquery，axios，用的时候觉得非常的舒服，他们把一些常用的指令都封装好了，只需要调用api就好了。
## 入手
我理解ajax封装是从库api开始理解的，需要暴露什么接口出来
```javascript
// 原生ajax方法封装 基于promise封装的方法
ajax({
    type: 'post',
    url: 'http://127.0.0.1:3000/test',
    data: {
        id: 1
    },
    dataType: 'json',
    header:{}
}).then((data) => {
    console.log(data)
}, (err) => {
    console.log(err)
})
```

------------


> 先写出自己需要哪些参数，再根据参数去封装

在本文中，只针对常用的两种接口进行封装，`post和get请求`
``` javascript
function ajax(obj) {
    return new Promise((resolve, reject) => {
	.//函数体
	}
}
```
需要使用异步回调`then`,所以采用了Promise函数

**Promise函数解释**
Promist是es6的一种构造函数，有` resolve `和` reject `两个参数

**以下三个状态**
- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。

函数执行结束后可以调用resolve函数来将promise状态改成fulfilled，或者在发生错误时将它的状态改为rejected。将数据丢进`resolve（data）`或者`reject（err）`
> 回到ajax正题

首先先解析`obj`参数，传入的是一个对象，可以使用es6的解构赋值和默认值
```javascript
let {
	type='GET', //默认为get
	dataType='json',//默认传回json值
	async=true, //默认异步
	url,
	data,
header={
          'Content-Type': 'application/x-www-form-urlencoded' // 设置请求头
 }} = obj
```