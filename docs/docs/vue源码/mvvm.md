### mvvm实现 包括数据劫持 以及依赖收集
```js
function defineReactive(data, key, val) {
  Observe(val);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      console.log(
        "属性" + key + "已经被监听了，现在值为：“" + newVal.toString() + "”"
      );
      dep.notify();
    }
  });
}

// 数据监听器
function Observe(data) {
  if (!data || typeof data !== "object") return;
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
}

// 订阅发布者 依赖收集
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  }
};
Dep.constructor = Dep;

function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.value = this.get();
}

Watcher.prototype = {
  update: function() {
    this.run();
  },
  run: function() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function() {
    Dep.target = this; // 缓存自己
    var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己
    return value;
  }
};

function SelfVue (data, el, exp) {
    this.data = data;
    observe(data);
    el.innerHTML = this.data[exp];  // 初始化模板数据的值
    new Watcher(this, exp, function (value) {
        el.innerHTML = value;
    });
    return this;
}


new SelfVue({},"el",qq)
new SelfVue({
  el:'#ddd',
  data:{},
  render(){
    
  }
})

function SelfVue ({data, el, exp}) {
  this.data = data;
  observe(data);
  el.innerHTML = this.data[exp];  // 初始化模板数据的值
  new Watcher(this, exp, function (value) {
      el.innerHTML = value;
  });
  return this;
}

```