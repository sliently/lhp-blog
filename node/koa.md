# koa源码解析

<!-- 看代码看的有点头晕了 -->
## koa主要分成5个部分的概念，
- Application 
- context
- request
- response
- middleware

> 以上5个概念应该还是很好理解的

首先把koa给下载下来了，可以看到这里有四个文件，这里我主要讲下application，也就是最核心的一个模块
!["koa目录"](https://user-gold-cdn.xitu.io/2018/12/27/167ef50936888d19?w=540&h=478&f=png&s=41114)

这里核心模块是application文件，从开始说起吧
```js
const Emitter = require("events");
class Koa2 extends Emitter {
  constructor() {
    super();
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  /**
   * 监听listen
   */
  listen(...args) {
    
  }
  /**
   * 回调函数
   */
  callback() {
    
  }
  /**
   * 使用插件
   * @param {} fn
   */
  use(fn) {
    
  }
}
```
以上我们常用的是一些接口，从这些东西入手吧，这里继承了emitter这个构造函数，也就是node里面的事件监听，用过的人应该使用过下面这种

```js
const app = new Koa2
app.on("error",()=>{

})
```
看到这里大概就明白了为什么要继承emitter，主要是为了实现事件分发

## 第二步吧 use函数

> 这里很简单，其实就是把use中的函数加到中间件队列中,都应该能理解了

```js
  /**
   * 使用插件
   * @param {} fn
   */
  use(fn) {
    this.middleware.push(fn);
    return this;
  }
```

## 看到第三步 listen函数，将中间件的方法加入到callback中

这里相当于是一个语法糖
```js
  /**
   * 监听listen
   */
  listen(...args) {
    let server = http.createServer(this.callback());
    server.listen(...args);
  }
    /**
   * 回调函数
   */
  callback() {
    const fn = conpose(this.middleware); //中间件的实现方式
    // if (!this.listenerCount('error')) this.on('error', this.onerror);
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    return handleRequest;
  }
```
这里将所有的中间件聚合成一个函数，这里聚合使用的是conpose，也就是koa的中间件洋葱模型
### 中间件
> 众所周知，koa是使用async的，
这里说的，这里的dispatch相当于next的意思吧！进入
```js
module.exports = function(middleware) {
  return function(ctx, next) {
    // let index = -1;
    return dispatch(0);
    function dispatch(i) {
      let fn = middleware[i];
      if (i === middleware.length) {
        fn = next
      }
      if(!fn) {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error)
      }
    }
  };
};
```


再回来看`callback`这个函数
```js
  callback() {
    const fn = conpose(this.middleware); //中间件的实现方式
    // if (!this.listenerCount('error')) this.on('error', this.onerror);
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    return handleRequest;
  }
  handleRequest(ctx, middleware) {
    return middleware(ctx).then(() => {
      console.log("中间件执行结束");
      // 这里可以拿到中间件里面修改的数据等
      /* 如ctx.response.body({

      }) */
      return ctx.response.res.end("hello");
    });
  }
  /**
   * 创建上下文
   */
  createContext(req, res) {
    // let ctx = {}
    const context = Object.create(this.context);
    context.request = Object.create(this.request);
    context.response = Object.create(this.response);
    context.app = this;
    context.response.res = res;
    context.request.req = req;
    return context;
  }
```
`req`和`res`是http.createServer()的回调函数，这里就不多说了
下面的重点是创建一个上下文`createContext`

这里就链接到`Object.create(this.context)`等, 其实也就是将context，request，response实例化，将callback里面回传的request，response重写了一下，并且提供了一些方法
`Object.create(this.request)`和`Object.create(this.response)` 就不细说了，都是封装一些方法，封装一些返回的值

进入到context文件，我们可以看到下面的这样一个函数调用，其实就是一个数据劫持
```js
delegate(proto, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable');
```

打个比方说`ctx.body`，其实就是`ctx.response.body` 这里做了一层代理，好处的话，可以不用污染ctx，并且不需要创建两份变量，这里可以去看看vue的data是怎么做的，为什么在`this`中能访问到data中的变量，这里是一样的

以上就是主要的koa内容了，至于其他都是开发中间件了
最后还有一个点 就是`inspect`,你看代码的时候会看到在生命对象和构造函数的时候都用到了这个inspect


举个例子哈！
```js
const proto = {
  inspect(){
    return "hello inspect";
  }
}
if (util.inspect.custom) {
  proto[util.inspect.custom] = proto.inspect;
}
let a = Object.create(proto)

console.log(a)
// 输出 "hello inspect"
```
koa里面用到，我理解的意思是，在打印的时候只打印出自己想打印出来的 ，别的不打印，其他就自己体会了。



