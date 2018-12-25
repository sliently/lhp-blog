//节点构造函数
let Node = function (e) {
    this.e = e;
    this.left = null;
    this.right = null;
}
//二分搜索树构造函数
let BST = function () {
    this.size = 0;
    this.root = null; //根节点
}
BST.prototype = {
    //获取子节点数
    getSize: function () {
        return this.size;
    },
    //查询子节点是否为空
    isEmpty: function () {
        return this.size == 0;
    },
    //添加元素
    add: function (e) {
        if (this.root == null) {
            this.root = new Node(e);
            this.size++;
        }
        else {
            this.addNode(this.root, e);
        }
    },
    //添加节点递归算法
    addNode: function (node, e) {
        if (e == node.e) {
            return;
        }
        else if (e < node.e && node.left == null) {
            node.left = new Node(e);
            this.size++;
            return;
        }
        else if (e > node.e && node.right == null) {
            node.right = new Node(e);
            this.size++;
            return;
        }
        if (e < node.e) {
            this.addNode(node.left, e);
        }
        else {
            this.addNode(node.right, e);
        }
    },
    //改进后的递归添加
    //主要要思索null也可以看作是一个二分搜索树
    newAdd: function (e) {
        this.root = this.newAddNode(this.root, e);
    },
    //改进后的递归
    //返回二分搜索树的根节点
    newAddNode: function (node, e) {
        if (node == null) {
            this.size++;
            return new Node(e);
        }
        else if (e < node.e) {
            node.left = this.newAddNode(node.left, e);
        }
        else if (e > node.e) {
            node.right = this.newAddNode(node.right, e);
        }
        return node;
    },
    //查询元素
    contains: function (e) {
        return this.containNode(this.root, e);
    },
    //以node为根的二分搜索树中是否包含元素e
    //递归算法
    containNode: function (node, e) {
        if (node == null) {
            return false;
        }
        else if (node.e == e) {
            return true;
        }
        else if (node.e < e) {
            return this.containNode(node.right, e);
        }
        else {
            return this.containNode(node.left, e);
        }

    },
    //前序遍历的非递归写法
    preOrderNR: function () {
        let a = [];
        a.push(this.root);
        while (a.length != 0) {
            let cur = a.pop();
            console.log(cur.e);
            if (cur.right != null) {
                a.push(cur.right);
            }
            if (cur.left != null) {
                a.push(cur.left);
            }
        }
    },
    //前序遍历
    preOrder: function () {
        this.preOrderNode(this.root);
    },
    //前序遍历以node为根的二分搜索树，递归算法
    preOrderNode: function (node) {
        if (node == null) {
            return;
        }
        console.log(node.e);
        this.preOrderNode(node.left);
        this.preOrderNode(node.right);
    },
    //中序遍历非递归
    newInOrder:function () {
      let a = [];
      let p = this.root;
      while(p != null || a.length != 0){
          if(p != null){
              a.push(p);
              p = p.left;
          }
          else {
              p = a.pop();
              console.log(p.e);
              p = p.right;
          }
      }
    },
    //中序遍历
    inOder: function () {
        this.inOderNode(this.root);
    },
    //中序遍历递归
    inOderNode: function (node) {
        if (node == null) {
            return;
        }
        this.inOderNode(node.left);
        console.log(node.e);
        this.inOderNode(node.right);
    },
    //后序遍历非递归
    newPostOrder:function () {
      let a = [];
      a.push(this.root);
      a.push(this.root);
      while(a.length > 0){
          let p = a.pop();
          if(a.length > 0 && p == a[a.length - 1]){
              if(p.right){
                  a.push(p.right);
                  a.push(p.right);
              }
              if(p.left){
                  a.push(p.left);
                  a.push(p.left);
              }
          }
          else {
              console.log(p.e);
          }
      }
    },
    //后序遍历
    postOder: function () {
        this.postOderNode(this.root);
    },
    //后序遍历递归
    postOderNode: function (node) {
        if (node == null) {
            return;
        }
        this.postOderNode(node.left);
        this.postOderNode(node.right);
        console.log(node.e);
    },
    //层序遍历（广度优先）借助队列
    levelOrder:function () {
      let a = [];
      a.push(this.root);
      while(a.length != 0){
         let cur = a.shift();
         console.log(cur.e);
         if(cur.left != null){
             a.push(cur.left);
         }
         if(cur.right != null){
             a.push(cur.right);
         }

      }
    },
    //返回最小值的节点
    minnum:function () {
        if(this.size == 0){
            console.log('this BST is empty');
        }
        return this.minnumNode(this.root);
    },
    minnumNode:function (node) {
        if(node.left == null){
            return node;
        }
        return this.minnumNode(node.left);
    },//返回最小值的节点
    maxnum:function () {
        if(this.size == 0){
            console.log('this BST is empty');
        }
        return this.maxnumNode(this.root);
    },
    maxnumNode:function (node) {
        if(node.right == null){
            return node;
        }
        return this.maxnumNode(node.right);
    },
    //删除最小值并返回
    removeMin:function () {
        let ret = this.minnum();
        this.root = this.removeMinNode(this.root);
        return ret;
    },
    removeMinNode:function (node) {
        if(node.left == null){
            let rightNode = node.right;
            node = null;
            this.size --;
            return rightNode;
        }
        node.left = this.removeMinNode(node.left);
        return node;
    },
    //删除最小值并返回
    removeMax:function () {
        let ret = this.maxnum();
        this.root = this.removeMaxNode(this.root);
        return ret;
    },
    removeMaxNode:function (node) {
        if(node.right == null){
            let leftNode = node.left;
            node = null;
            this.size --;
            return leftNode;
        }
        node.right = this.removeMaxNode(node.right);
        return node;
    },
    //删除节点
    remove:function (e) {
        this.root = this.removeNode(this.root,e);
    },
    removeNode:function (node,e) {
          if(node == null){
              return null;
          }
          else if(e < node.e){
              node.left = this.removeNode(node.left,e);
              return node;
          }
          else if(e > node.e){
              node.right = this.removeNode(node.right,e);
              return node;
          }
          else { // e == node.e
              if(node.left == null){
                  let rightNode = node.right;
                  node.right = null;
                  this.size --;
                  return rightNode;
              }
              if(node.right == null){
                  let leftNode = node.left;
                  node.left = null;
                  this.size --;
                  return leftNode;
              }
              //找到后继节点，为删除节点右子树中的最小节点
              let successor = this.minnumNode(node.right);
              //先继承右子树，避免继承左子树后发生错误，先找右子树中的最小值
              successor.right = this.removeMinNode(node.right);
              successor.left = node.left;
              node.left = null;
              node.right = null;
              return successor;

          }
    }


}
let bst = new BST;
let num = [5, 3, 6, 8, 4, 2];
for (let i = 0; i < num.length; i++) {
    bst.add(num[i]);
}
bst.preOrder();
console.log('///')
bst.inOder();
console.log('///')
bst.newInOrder();
console.log('///')
bst.postOder();
console.log('///')
bst.newPostOrder();
console.log('///')
bst.preOrderNR();
console.log('///')
bst.levelOrder();
console.log(bst.minnum(),bst.maxnum());
bst.remove(3);
bst.inOder();



