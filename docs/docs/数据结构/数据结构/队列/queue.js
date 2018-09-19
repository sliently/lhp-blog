//基于队列的构造函数
let Queue = function (capacity) {
    this.arr = new Array;
    this.arr.length = capacity || 0;
}
Queue.prototype = {
    //入队
    enqueue:function (e) {
        this.arr.splice(this.arr.length,1,e)
    },
    //出队
    dequeue:function () {
        return this.arr.splice(0, 1)[0];
    },
    //队首
    getFront:function () {
        return this.arr[0];
    },
    getSize:function () {
        return this.arr.length;
    },
    isEmpty:function () {
        return this.arr.length === 0;
    }
}
let queue = new Queue;
for (let i = 0 ; i < 5 ; i++){
    queue.enqueue(i);
}
console.log(queue.arr);
queue.dequeue();
console.log(queue.arr);
