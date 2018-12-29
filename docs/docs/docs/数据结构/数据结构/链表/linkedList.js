//最简单的动态数据结构
//建立一个node（节点）的构造函数
//双链表中还有一个prev的指针指向前一个节点
let Node = function (e) {
    this.element = e;
    this.next = null;
}
let LinkedList = function () {
    this.size = 0;
    //虚拟头结点
    this.dummyHead = new Node(null, null)
}
LinkedList.prototype = {
    getSize: function () {
        return this.size;
    },
    isEmpty: function () {
        return this.size == 0;
    },
    //在链表的index的位置添加元素
    //真正使用时很少用，因为链表无索引
    add: function (index, e) {
        if (index < 0 || index > this.size) {
            console.log('this index is illegal')
        }
        else {
            let prev = this.dummyHead;
            //遍历找到prev
            for (let i = 0; i < index; i++) {
                prev = prev.next;
            }
            let node = new Node(e);
            node.next = prev.next;
            prev.next = node;
            // prev.next = new Node(e, prev.next);
            this.size++;
        }
    },
    //在链表头添加新的元素e
    addFirst: function (e) {
        this.add(0, e);
    },
    //在链表尾添加新的元素e
    addLast: function (e) {
        this.add(this.size, e);
    },
    //获得index位置的元素
    get: function (index) {
        if (index < 0 || index > this.size) {
            console.log('this index is illegal')
        }
        else {
            let cur = this.dummyHead.next;
            for (let i = 0; i < index; i++) {
                cur = cur.next;
            }
            return cur.element;
        }
    },
    //获得第一个元素
    getFirst: function () {
        return this.get(0);
    },
    //获得最后一个元素
    getLast: function () {
        return this.get(this.size);
    },
    //改变index位置的元素为e
    set: function (index, e) {
        if (index < 0 || index > this.size) {
            console.log('this index is illegal')
        }
        else {
            let cur = this.dummyHead.next;
            for (let i = 0; i < index; i++) {
                cur = cur.next;
            }
            cur.element = e;
        }
    },
    //查找链表中是否有元素e
    contains: function (e) {
        let cur = this.dummyHead.next;
        while (cur != null) {
            if (cur.element == e) {
                return true;
            }
            cur = cur.next;
        }
        return false;
    },
    //删除索引为index的元素
    remove:function (index) {
        if (index < 0 || index >= this.size) {
            console.log('this index is illegal')
        }
        let prev = this.dummyHead;
        for(let i = 0 ; i < index ; i++){
            prev = prev.next;
        }
        let delNode = prev.next;
        prev.next = delNode.next;
        delNode.next = null;
        return delNode.element;
    },
    toString:function () {
        let ret = '';
        let cur = this.dummyHead.next;
        while(cur != null){
            ret = ret + cur.element + '->';
            cur = cur.next;
        }
        ret += 'NULL';
        return ret;
    }
}
let linkedList = new LinkedList;
for(let i = 0 ; i < 5 ; i++){
    linkedList.addFirst(i);
    console.log(linkedList.toString())
}
linkedList.set(2,666);
console.log(linkedList.toString())
console.log(linkedList.contains(666))
linkedList.remove(2);
console.log(linkedList.toString())



//用链表来实现栈
let linkedListStack = function () {
    this.list = new LinkedList;
}
linkedListStack.prototype = {
    pop:function () {
        this.list.remove(0);
    },
    push:function (e) {
        this.list.addFirst(e);
    },
    peek:function () {
        return this.list.getFirst();
    },
    getSize:function () {
        return this.list.getSize();
    },
    isEmpty:function () {
        return this.list.isEmpty();
    }
}