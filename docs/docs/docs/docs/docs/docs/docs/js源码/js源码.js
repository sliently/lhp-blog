//构造函数中
function aPromise(executor) {
    let self = this;

    /*初始化status*/
    self.status = 'pending';
    /*初始化value*/
    self.value = undefined;
    /*订阅事件的数组*/
    self.onResolvedCallBacks = [];
    self.onRejectedCallBacks = [];
    function resolve(value) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'fulfilled'
                self.value = value
            }
        }, 0)
    }
    function reject(reason) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'rejected'
                self.value = reason
            }
        }, 0)
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}
function resolvePromise(promise, onFulfilled, onRejected) {
    if (promise.status === 'fulfilled') {
        console.log(promise.value)
        onFulfilled(promise.value)
    }
    if (promise.status === 'rejected') {
        onRejected(promise.value)
    }
    if (promise.status === 'pending') {
        resolvePromise(promise, onFulfilled, onRejected)
    }
}
aPromise.prototype.then = function (onFulfilled, onRejected) {
    let that = this
    setTimeout(()=>{
        resolvePromise(that, onFulfilled, onRejected)
    },0)
    
}


function a() {
    return new aPromise(function (resolve, reject) {   
        setTimeout(()=>{
            console.log(1321)
            resolve(132132)
        },0)
        
    })
}
(async () => {
    a().then(function (data) {
        console.log(data)
    }, function (data) {
        console.log(1,data)
    })
    console.log(12)
})()


