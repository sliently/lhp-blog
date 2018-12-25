## tcp 协议
### server 建立
```js
const net = require('net')
let server = net.createServer((socket)=>{
    socket.on('data',(data)=>{
        socket.write("你好")
    })
    socket.on('end',()=>{
        console.log("连接断开")
    })
    socket.write("欢迎光临")
})
server.listen(8124,()=>{
    console.log("server bound")
})
```

- on("data") 
- write： 发送消息


 ### client建立


```js
const net = require('net')
var client = net.connect({port:8124},()=>{
    console.log('client connected')
})
client.on('data',(data)=>{
    console.log(data.toString())
    // client.end()
})

client.on('end',(data)=>{
    console.log('client disconnect')
})

```
## udp协议
### server 启动
```js
const dgram = require('dgram')
let server = dgram.createSocket('udp4')
server.on('message',(msg,rinfo) => {
    console.log('sercer got: ' + msg + ' from '+ rinfo.address + ':' + rinfo.port)
})
server.on('listening',()=>{
    let address = server.address()
    console.log("server listening %d : %d ", address.address,address.port)
})
server.bind(41234)
```
- message: 当网口接收到消息时触发该事件，触发携带的数据为消息buffer对象和一个远程地址信息
- listening： 当`udp`套接字开始监听时触发该事件
- close： 调用`close() `方法时触发该事件，并不再触发message事件，如需再次触发，绑定即可
- error：当异常发生时触发该事件

### client 启动
```js
const dgram = require('dgram')
let message = Buffer("深入浅出")
console.log(message)
let client = dgram.createSocket('udp4')
client.send(message, 0, message.length, 41234, "localhost", (err, bytes) => {
    client.close()
})
```
