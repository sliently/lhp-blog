```js
//bind实现

Function.prototype.bind = function (that) {
    var self = this
    var slice = Array.prototype.slice
    var arr = slice.call(arguments, 1)
    return function () {
        self.apply(that, [...arr, ...arguments])
    }
}
var obj = {
    a: 20,
    b: 30
}
function a(a, b) {
    console.log(this.b + a + b)
}
// var b = a.bind(obj,10)
// b(20)
// 原生bind实现

Function.prototype.call2 = function (context) {
    var context = Object(context) || window
    context.fn = this
    var args = []
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    var res = context.fn(args)
    delete context.fn
    return res
}


function all(arr) {
    let length = arr.length
    let count = 0
    let arrs = new Array(length)
    return new Promise((resolve, reject) => {
        arr.forEach((item, index) => {
            item(index).then(function (res) {
                arrs[index] = res
                count++
                if (count === length) {
                    resolve(arrs)
                }
            }, function (err) {
                reject(err)
            })
        });
    })
}
function a(b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(b)
        }, 10000 * b / 8)
    })
}
all([a, a, a, a, a, a, a, a]).then((data) => {
    console.log(data)
})

function ClassA(){
    this.a = 10
}
ClassA.prototype={

}
ClassA.constructor = ClassA

const classA = new ClassA()
console.log(classA.prototype)
```
