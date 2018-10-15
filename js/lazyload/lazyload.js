function LazyLoad() {
    this.getPositions()
    this.initData()
}

LazyLoad.prototype.initData = function () {
    let scrolls = debounce(this.replaceUrl, 1000).bind(this)
    window.addEventListener('scroll', scrolls)
}

// 进行懒加载
LazyLoad.prototype.replaceUrl = function () {
    this.getPositions()
}
/**
 * 获取需要懒加载图片的位置
 */
LazyLoad.prototype.getPositions = function () {
    let imgs = document.querySelectorAll('.J_lazyload')
    let targetHeight = window.innerHeight
    this.arrImgs = []
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
        if (pos.top < targetHeight && pos.bottom > 0) {
            // 这里是使用的Image，下载完成后再将对应的dom节点的src，可以避免逐渐显现的过程
            let image = new Image()
            image.src = items.dataset.src
            image.onload = handle
            items.classList.remove('J_lazyload')
            this.arrImgs.push(items.dataset.src)
        }
    }
}
let lazyLoad = new LazyLoad()
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