# ajax封装
>  今天的话题是ajax封装 2018.04.17

[ajax所有代码]('./ajax2018-04-17.js' "ajax所有代码")

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
> 函数主体

在这之前，先进行两个函数的封装
 ie7以前版本兼容处理
```javascript
// 创建XHRHttpRequest onreadyState
function createXHR() {
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest()
    } else if (typeof ActiveXObject != 'undefined') { //兼容ie7以前版本
        return new ActiveXObject('Microsoft.XMLHTTP')
    } else {
        return new Error('NO XHR object available.')
    }
}
// 拼接url get方法
function urlMosaic(url, data = {}) {
    if (data == {}) {
        return url
    }
    let prames = ''
    for (let x in data) {
        prames += `&${encodeURIComponent(x)}=${encodeURIComponent(data[x])}`
    }
    return url + '?' + prames.slice(1)

}
```
下面进行函数主体的编写
```javascript

// 全部转换为大写，可以不区分大小
        type = type.toUpperCase()
		//调用封装的createXHR
        let XHR = createXHR()
		//监听readyState改变
        XHR.onreadystatechange = function() {
		/* readyState属性取值
		0 未初始化。尚未调用open方法
		1 启动。调用open方法，尚未调用send方法
		2 发送。调用send方法。尚未接收到响应
		3 接收。已经接收到部分响应数据
		4 完成。接收到所有响应数据 */
            if (XHR.readyState == '4') {
                // status http状态码
                if (XHR.status >= 200 && XHR.status < 300 || XHR.status === '304') {
				//返回json数据
                    if (dataType.toUpperCase() == 'JSON') {
                        resolve(JSON.parse(XHR.responseText))
                    }else{
					    resolve(XHR.responseText)
					}
                } else {
                    reject('请求失败 状态码:' + XHR.status)
                }
            }
        }
        // get请求发送
        if (type === 'GET') {
            // 拼接过后的url
            let urls = urlMosaic(url, data)
            XHR.open('get', urls, async)
            for (let x in header) {
                XHR.setRequestHeader(x, header[x])
            }
            XHR.send()
        }
		//post请求发送
        if (type === 'POST') {
            XHR.open('post', url, async)
			//注意 请求头设置要在open之后，send之前
			//以表单形式发送，必须添加这个请求头
            for (let x in header) {
                XHR.setRequestHeader(x, header[x])
            }
            let str = ''
            for (let x in data) {
                str += `&${x}=${data[x]}`
            }
            str = str ? str.slice(1) : str
            XHR.send(str)
```
> 至此一个简单的ajax就实现了，其他数据类型和请求类型如法炮制

# 结语
> 在封装ajax的过程中，我了解了如何使用XHR请求，来进行请求数据，更加习惯封装抽调一些复杂函数，减少内部函数体的复杂化，便于维护。
