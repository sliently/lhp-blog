# js的继承问题
> 继承问题 2018.04.21

-----
学继承之前，势必先谈下`prototype`和`__proto__`，在js中什么都是对象（我的理解），全局api是一个大的对象属性。
- `__proto__`
	对象具有属性`__proto__`，可称为隐式原型,方法是对象，所以也具有`__proto__`这个属性，这个属性是一个指针，指向构造函数的prototype，也就是这个意思
	
```javascript
function Person(){
}
Person.propotype.one=function(){
}
Person.propotype===new Person().__proto__ //true
```
	
- `prototype`
	谈这个势必会先了解到方法 也就是`Function`,每一个方法都会有`prototype`这个属性,`prototype`指向原型对象。
	有一张有趣的图[![辅导费](./img/prototype.jpg)]