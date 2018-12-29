### buffer

string 转buffer
```js
let str = "dsada"
let buf = new Buffer(str,"utf-8") // 默认是utf-8
```

buffer 转 string
```js
buf.toString('utf-8')
```

读取文件时一般是流式读取,当我们限制每次buffer长度限制为11，读取中文字符就会出现乱码，这时候可以用`setEncoding('utf-8')`

虽然能解决问题，但是没有从根本上解决问题
```js
const fs = require("fs");
const rs = fs.createReadStream("test.md", { highWaterMark: 11 });
let data = "";
rs.setEncoding('utf-8')
rs.on("data", chunk => {
  data += chunk;
});
rs.on("end", () => {
  console.log(data);
});
```
从根本上解决问题，不会将字截取开来 ，因为中文字符三个字节一个存储，不够的部分放到下一次读取
```js
const fs = require("fs");
const rs = fs.createReadStream("test.md", { highWaterMark: 11 });

const StringDecoder = require('string_decoder').StringDecoder
let decoder = new StringDecoder('utf-8')
let data = "";
// rs.setEncoding('utf-8')
rs.on("data", chunk => {
  data +=  decoder.write(chunk);
});
rs.on("end", () => {
  console.log(data);
});
```
正确拼接buffer的方法,小buffer copy到大buffer的过程
```js
let data = [];
let length = 0;
// rs.setEncoding('utf-8')
rs.on("data", chunk => {
  data.push(chunk);
  length += chunk.length;
});
rs.on("end", () => {
  let rr = Buffer.concat(data,length);
  console.log(rr.toString());
});
```

