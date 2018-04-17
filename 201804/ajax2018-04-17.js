// 原生ajax方法封装

ajax({
    type: 'post',
    url: 'http://127.0.0.1:3000/test',
    data: {
        id: 1
    },
    dataType: 'json'
}).then((data) => {
    console.log(data)
}, (err) => {
    console.log(err)
})
// 回调实现
/* readyState属性取值
0 未初始化。尚未调用open方法
1 启动。调用open方法，尚未调用send方法
2 发送。调用send方法。尚未接收到响应
3 接收。已经接收到部分响应数据
4 完成。接收到所有响应数据 */
function ajax(obj) {
    return new Promise((resolve, reject) => {
        let {type='GET', dataType='json', async=true, url, data, header={
                'Content-Type': 'application/x-www-form-urlencoded'
            }} = obj
        // 全部转换为大写，可以不区分大小写
        type = type.toUpperCase()
        let XHR = createXHR()
        XHR.onreadystatechange = function() {
            if (XHR.readyState == '4') {
                // status http状态码
                if (XHR.status >= 200 && XHR.status < 300 || XHR.status === '304') {
                    if (dataType.toUpperCase() == 'JSON') {
                        resolve(JSON.parse(XHR.responseText))
                    }
                } else {
                    reject('请求失败 状态码:' + XHR.status)
                }
            }
        }
        // 设置请求头

        if (type === 'GET') {
            // 拼接过后的url
            let urls = urlMosaic(url, data)
            XHR.open('get', urls, async)
            for (let x in header) {
                XHR.setRequestHeader(x, header[x])
            }
            XHR.send()
        }
        if (type === 'POST') {
            XHR.open('post', url, async)
            for (let x in header) {
                XHR.setRequestHeader(x, header[x])
            }
            let str = ''
            for (let x in data) {
                str += `&${x}=${data[x]}`
            }
            str = str ? str.slice(1) : str
            XHR.send(str)
        }
    })
}
// 创建XHRHttpRequest onreadyState 1
function createXHR() {
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest()
    } else if (typeof ActiveXObject != 'undefined') {
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