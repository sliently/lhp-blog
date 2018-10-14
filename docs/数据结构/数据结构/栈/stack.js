//建立stack这个构造函数
let Stack = function () {
    this.arr = new Array;
}
Stack.prototype.constructor = Stack;
Stack.prototype = {
    pop: function () {
        return this.arr.splice(this.arr.length - 1, 1)[0];
    },
    push: function (e) {
        this.arr.splice(this.arr.length, 1, e);
    },
    peek: function () {
        return this.arr[0];
    },
    isEmpty: function () {
        return this.arr.length === 0;
    },
    getSize: function () {
        return this.arr.length;
    },
    toString:function () {
      return this.arr;
    }
}
let a = new Stack;
for (let i = 0; i < 5; i++) {
    a.push(i);
}

console.log(a.arr);
console.log(a.pop())
console.log(a.arr);


//用栈解决的括号匹配问题
let solution = function (str) {
    let a = str.split('');
    let b = [];
    for (let i = 0 ; i < a.length ; i++){
        if(a[i] == '{' || a[i] == '(' || a[i] == '['){
            b.push(a[i]);
        }
        else {
            if(b.length == 0){
                return false;
            }
            else {
                let top = b.pop();
                if(a[i] == '}' && top != '{'){
                    return false;
                }
                if(a[i] == ']' && top != '['){
                    return false;
                }
                if(a[i] == ')' && top != '('){
                    return false;
                }
            }
        }
    }
    return b.length === 0;
}
console.log(solution('(]'))
