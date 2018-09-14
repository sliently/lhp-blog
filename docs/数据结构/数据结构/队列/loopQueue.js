//循环队列的构造函数
let LoopQueue = function (capacity) {
    this.arr = new Array;  //初始化数组
    this.front = 0;  //初始化队首
    this.tail = 0;   //初始化队尾
    this.size = 0;  //初始化成员数量
    this.arr.length = capacity + 1 || 1;  //依据用户输入开辟控件，表示最多容纳的成员，注意要多留一个空间给循环队列
    this.capacity = this.arr.length - 1;
}
LoopQueue.prototype = {
    //返回容量
    getCapacity: function () {
        return this.capacity;
    },
    //返回目前的成员数量
    getSize: function () {
        return this.size;
    },
    //判断是否为空，队首和队尾指向相同空间时即为空
    isEmpty: function () {
        return this.front == this.tail;
    },
    //取出对首元素
    getFront:function () {
      if(this.isEmpty()){
          console.log('this queue is empty')
      }
      else {
          return this.arr[this.front];
      }
    },
    //入队
    enqueue: function (e) {
        //判断如果队里里满员，便扩容
        if ((this.tail + 1) % this.arr.length == this.front) {
            this.resize(this.getCapacity() * 2);
        }
        this.arr[this.tail] = e;
        this.tail = (this.tail + 1) % this.arr.length;
        this.size++;
    },
    //出队
    dequeue: function () {
        if (this.isEmpty()) {
            console.log('this queue is empty');
        }
        let ret = this.arr[this.front];
        this.arr[this.front] = null;
        this.front = (this.front + 1) % this.arr.length;
        this.size --;
        if(this.size <= this.getCapacity() / 4 && this.getCapacity() / 2 != 0){
            this.resize(this.getCapacity() / 2);
        }
        return ret;
    },
    //调整数组
    resize: function (newCapacity) {
        let newArr = new Array;
        newArr.length = newCapacity + 1;
        //填充新数组
        for (let i = 0; i < this.size; i++) {
            newArr[i] = this.arr[(this.front + i) % this.arr.length];
        }
        this.arr = newArr;
        this.capacity = newArr.length - 1;
        this.front = 0;
        this.tail = this.size;
    }
}
let loopQueue = new LoopQueue(10);
for (let i = 0 ; i < 10 ; i++){
    loopQueue.enqueue(i);
    console.log(loopQueue);
    if(i % 3 == 2){
        loopQueue.dequeue();
        console.log(loopQueue);
    }
}
console.log(loopQueue.getFront());
