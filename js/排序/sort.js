// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2)
    var pivot = arr.splice(pivotIndex, 1)[0]
    var left = []
    var right = []
    for (var i = 0, ii = arr.length; i < ii; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}
// var a = quickSort([1,3,2,5,9,4,1])
function debounce(fn, time) {
    var timer = null;
    time = time || 60;
    var _arguments;
    return function () {
        var self = this
        clearTimeout(timer)
        _arguments = arguments;
        timer = setTimeout(() => {
            fn.apply(self, _arguments)
            timer = null
        }, time)
    }
}

function throttle(fn, timer) {
    var context
    var timer = null
    var _argument
    return function () {
        context = this
        _argument = arguments
        if (!timer) {
            setTimeout(() => {
                fn.apply(context, _argument)
                timer=null
            }, timer)
        }
    }
}

debounce(quickSort, 60)([1, 3, 2, 5, 9, 4, 1])