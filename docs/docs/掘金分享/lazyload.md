## 给你一个图片懒加载（lazyload）

> 废话就不多说了，直接上教程吧

- 看了许多篇的教程，基本都是获取img标签，然后判断他是否在可视范围之内。然后全局定义个值，纪录懒加载所进行到的位置,这里我介绍的有点不一样

将需要做懒加载的元素占一下位，这里为什么我是用一个类名是来获取元素下面会有介绍
```html
<img class="J_lazyload" data-src="{{路径}}" />
<!-- 这里是给背景做懒加载 -->
<div class="J_lazyload" data-src="{{路径}}"></div>
```

定义一个lazyload的构造函数，并且定义一个获取对应的节点位置的方法
```js
function LazyLoad() {
    this.getPositions()
    this.initData()
}
LazyLoad.prototype.getPositions = function () {
    //这里需要使用获取静态节点列表，不能获取动态节点列表，因为需要移除J_lazyload钩子
    let imgs = document.querySelectorAll('.J_lazyload')
    let targetHeight = window.innerHeight
    for (let i = 0, ii = imgs.length; i < ii; i++) {
        let items = imgs[i]
        let handle = ((img)=>{
            return function(){
                if (img.tagName.toLowerCase() === 'img') {
                    img.src = img.dataset.src;
                } else {
                    img.style['background-image'] = 'url(' + img.dataset.src + ')';
                }
            }
        })(items)
        let pos = items.getBoundingClientRect()
        // 这里是判断是否在屏幕内
        if (pos.top < targetHeight && pos.bottom > 0) {
            // 这里是使用的Image，下载完成后再将对应的dom节点的src
            let image = new Image()
            image.src = items.dataset.src
            image.onload = handle
            // 移除J_lazyload钩子，防止重复进行懒加载
            items.classList.remove('J_lazyload')
        }
    }
}
```

绑定事件之前 = >，先来说一下防抖,由于频繁触发，所以这里需要引入防抖函数

```js
function debounce(fn, time) {
    var timer = null;
    time = time || 60;
    var _arguments;
    return function () {
        var self = this
        clearTimeout(timer)
        _arguments = [...arguments];
        timer = setTimeout(() => {
            fn.apply(self, _arguments)
            timer = null
        }, time)
    }
}
```
### 绑定window的滚动事件，
```js
LazyLoad.prototype.initData = function () {
    let scrolls = debounce(this.replaceUrl, 1000).bind(this)
    window.addEventListener('scroll', scrolls)
}

// 进行懒加载
LazyLoad.prototype.replaceUrl = function () {
    this.getPositions()
}
```

以上就是实现一个基本的懒加载了。觉得不错的话，可以点个赞呀