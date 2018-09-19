var outClick = function out(){
    alert("out 捕获")
}
var innerClick = function out(){
    alert("inner 捕获")
}
var middleClick = function out(){
    alert("middle 捕获")
}

var outClick1 = function out(){
    alert("out 冒泡")
}
var innerClick1 = function out(){
    alert("inner 冒泡")
}
var middleClick1 = function out(){
    alert("middle 冒泡")
}
out.addEventListener("click",outClick,true)
middle.addEventListener("click",middleClick,true)

inner.addEventListener("click",innerClick1,false)
inner.addEventListener("click",innerClick,true)

out.addEventListener("click",outClick1,false)
middle.addEventListener("click",middleClick1,false)


// 依次输出
