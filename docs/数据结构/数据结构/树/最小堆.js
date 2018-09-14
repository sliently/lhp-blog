//最小堆：任何节点都小于他们的左右子节点
//用于解决对100万数据中取出最大的100个类似问题：优先队列
let MinHeap = function (capacity) {
    this.arr = [];
    this.size = 0;
    this.arr.length = capacity || 0;
}
MinHeap.prototype = {
    //getSize
    getSize:function () {
        return this.size;
    },
    isEmpty:function () {
        return this.size == 0;
    },
    //获取父节点
    parent:function (index) {
        if(index == 0){
            console.log('index 0 has no parent');
        }
        else {
            return Math.floor((index - 1) / 2);
        }
    },
    //获取左孩子节点
    leftChild:function (index) {
        return index * 2 + 1;
    },
    //获取右孩子节点
    rightChild:function (index) {
        return index * 2 + 2;
    },
    //添加元素
    //和最大堆相同，先将元素插入最后一个位置，再进行siftUp上浮
    add:function (e) {
        this.arr.push(e);
        this.size ++;
        this.siftUp(this.size - 1);
    },
    //最小堆上浮的原理是，如果父节点大于自己，则交换位置
    siftUp:function (index) {
        //判断不是根节点
        while(index > 0 && this.arr[this.parent(index)] > this.arr[index]){
            this.swap(index,this.parent(index));
            index = this.parent(index);
        }
    },
    //交换索引对应值
    swap:function (i,j) {
        if(i < 0 || i > this.size || j < 0 || j > this.size){
            console.log('this index is illegal');
        }
        else {
            let tmp = this.arr[i];
            this.arr[i] = this.arr[j];
            this.arr[j] = tmp;
        }
    },
    //找到最小元素
    findMin:function () {
      if(this.size == 0){
          console.log('this heap is empty');
      }
      else {
          return this.arr[0];
      }
    },
    //删除根节点元素，先和最后一个元素交换位置，再删除
    //对最后一个元素进行siftDown
    extracMin:function () {
        let res = this.findMin();
        //交换位置
        this.swap(0,this.size - 1);
        //删除最后一个元素
        this.arr.pop();
        this.size --;
        //下沉
        this.siftDown(0);
        return res;
    },
    //下沉原理，选出左右子节点中最小的比较，小的话便交换位置
    siftDown:function (index) {
        //判断是否有左节点
        while(this.leftChild(index) < this.size){
            let i = this.leftChild(index);
            if(i + 1 < this.size && this.arr[i] > this.arr[i + 1]){
                i++;
            }
            if(this.arr[i] < this.arr[index]){
                this.swap(i,index);
                index = i;
            }
            else {
                break;
            }
        }
    },
    //取出根节点代替根节点
    replace:function (e) {
        let res = this.findMin();
        this.arr[0] = e;
        this.siftDown(0);
        return res;
    },
    //heapity,输入数组使之成为最小堆
    //从最后一个非叶子节点开始最siftDown
    heapity:function (arr) {
        this.arr = arr;
        for(let i = this.parent(arr.length - 1); i >= 0 ; i--){
            this.siftDown(i);
        }
        return arr;
    }
}
let minheap = new MinHeap;
for(let i = 0 ; i < 10 ; i ++){
    minheap.add(Math.random() * 10);
}
console.log(minheap.arr);
console.log(minheap.extracMin());
console.log(minheap.arr);
let arr = [4,1,6,3,5,2,9];
console.log(minheap.heapity(arr));
let a = [];
console.log()


