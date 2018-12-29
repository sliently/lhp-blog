//binary heap
//最大堆：所有的节点总大于它的左右子节点，根节点为最大值
//用数组储存
let MaxHeap = function (capacity) {
    this.arr = [];
    this.arr.length = capacity || 0;
    this.size = 0;
}
MaxHeap.prototype = {
    //返回大小
    size: function () {
        return this.size;
    },
    isEmpty: function () {
        return this.size == 0;
    },
    //父节点的元素
    parent: function (index) {
        if (index == 0) {
            console.log('this node does not have parent')
        }
        return Math.floor((index - 1) / 2);
    },
    //左孩子的索引
    leftChild: function (index) {
        return index * 2 + 1;
    },
    //右孩子的索引
    rightChild: function (index) {
        return index * 2 + 2;
    },
    //为堆添加元素，上浮过程
    add: function (e) {
        this.arr.push(e);
        this.size++;
        this.siftUp(this.size - 1);
    },
    //上浮
    siftUp: function (index) {
        while (index > 0 && this.arr[this.parent(index)] < this.arr[index]) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    },
    //交换位置
    swap: function (i, j) {
        if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
            console.log('index is illeagal');
        }
        else {
            let tmp = this.arr[i];
            this.arr[i] = this.arr[j];
            this.arr[j] = tmp;
        }
    },
    //查看堆中的最大元素
    findMax: function () {
        if (this.size == 0) {
            console.log('this heap is empty')
        }
        else {
            return this.arr[0];
        }
    },
    //取出元素，只能取出最大的元素（根节点）
    extractMax: function () {
        let res = this.findMax();
        //先后最后一个元素交换位置，再删除
        this.swap(0, this.size - 1);
        this.arr.pop();
        this.size--;
        //下沉操作
        this.siftDown(0);
        return res;
    },
    //下沉操作
    siftDown: function (index) {
        while (this.leftChild(index) < this.size) {
            let i = this.leftChild(index);
            if (i + 1 < this.size && this.arr[i] < this.arr[i + 1]) {
                //选择右孩子的节点
                i++;
            }
            if (this.arr[index] > this.arr[i]) {
                break;
            }
            else {
                this.swap(index, i);
                index = i;
            }
        }
    },
    //替换最大元素
    replace: function (e) {
        let res = this.findMax();
        this.arr[0] = e;
        this.siftDown(0);
        return res;
    },
    //将任意数组整理成堆的形状
    //从最后一个非叶子节点开始进行siftDown操作
    //获取最后一个非叶子节点：最后一个子节点的父节点
    heapify: function (arr) {
        this.arr = arr;
        for (let i = this.parent(arr.length - 1); i >= 0; i--) {
            this.siftDown(i);
        }
        return arr;
    }
}
let maxheap = new MaxHeap;
let n = 10;
for (let i = 0; i < n; i++) {
    maxheap.add(Math.random() * n)
}
console.log(maxheap.arr)
console.log(maxheap.extractMax());
console.log(maxheap.arr)
let arr = [1, 3, 4, 5, 6, 2, 7]
console.log(maxheap.heapify(arr))

//优先队列：入队和队列相同，权重高的先出队
//利用最大堆可以解决
//经典问题：在100万个元素中选出前100名元素（在n中取出m）
//时间复杂度 nlogm 最小堆

