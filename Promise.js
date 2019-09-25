//简单实现，未对链式调用做实现；

function Promise(executor){
    let _this = this
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledArr = [] //成功的回调
    this.onRejectedArr = []  //失败回调
    executor(resolve, reject) //实例化 立即执行
    function resolve(value){
        if(_this.state == 'pending'){
            _this.value = value
            _this.onFulfilledArr.forEach(fn => fn(value))
            _this.state = 'fulfilled'
        }
    }
    function reject(reason){
        if(_this.state == 'pending'){
          _this.reason = reason
          _this.onRejectedArr.forEach(fn => fn(value))
          _this.state = 'rejected'
       }
    }
}

Promise.prototype.then = function(onFulfilled, onRejected){
    if (this.state === 'pending') {
        if (typeof onFulfilled === 'function') {
            this.onFulfilledArr.push(onFulfilled);
        }
        if (typeof onRejected === 'function') {
            this.onRejectedArr.push(onRejected);
        }
    }
    if(this.state === 'fulfilled' && typeof onFulfilled == 'function'){
        onFulfilled(this.value)
    }
    if(this.state == 'rejected' && typeof onRejected == 'function'){
        onRejected(this.reason)
    }
}

// 测试
// new iPromise((res, rej)=>{
//	 setTimeout(()=>res(1), 100)
// }).then(p => console.log(p))
//
// 1
