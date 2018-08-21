## vue源码解读


```js
function observe(value, cb) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}
function defineReactive (obj,key,val,cb){
    Object.defineProperty(obj, key ,{
        get:()=>{
            // 订阅
        },
        set: ()=>{
            // 触发订阅者的回调
            cb()
        }
    })
}


class Vue {
    constructor(options) {
        this._data = options.data;
        observe(this._data, options.render)
    }
}

let app = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render(){
        console.log("render");
    }
})

// 将vue中定义的data注册，变成可观察的
```

这里访问data中的数据需要 app._data.text

就需要做一个代理

```js

_proxy.call(this,options.data)
function _proxy (data) {
    const that = this;
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter () {
                return that._data[key];
            },
            set: function proxySetter (val) {
                that._data[key] = val;
            }
        })
    });
}
```
这里 利用了`Object.defineProperty()`方法,将属性映射为_data下面的属性


#### 依赖收集

```js

```

