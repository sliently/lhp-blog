// 快速排序
### 快速排序
```js
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
```
// var a = quickSort([1,3,2,5,9,4,1])

### 插入排序
```js
//插入排序
function sort(arr) {
    var arr = [5, 2, 4, 6, 1, 3],
        len = arr.length, tmp;
    for (let i = 1; i < len; i++) {
        tmp = arr[i]
        let j = i - 1
        while (j >= 0 && tmp < arr[j]) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = tmp;
    }
    return arr
}
```
