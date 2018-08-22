## ORM 框架

对象关系映射，目前数据库是关系型数据库 ORM 主要是把数据库中的关系数据映射称为程序中的对象

> sequelize 框架，以 mysql 为驱动

```javascript
npm install sequelize mysql --save
```

第一步创建一个 sequelize 实例

```javascript
const Sequelize = require("sequelize");

var sequlize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});
```

> sequelize.define 定义一个表映射，可以传递三个参数，第一个是表名，第二个是表映射，第三个是开启一些功能

```js
var user = sequelize.define(
  "user",
  {
    user_email: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      isEmail: true
    },
    user_name: Sequelize.STRING(50),
    user_avatar: Sequelize.STRING(50),
    user_signature: Sequelize.STRING(200),
    user_createTime: Sequelize.BIGINT(50),
    user_updateTime: Sequelize.BIGINT(50)
  },
  {
    timestamps: false
  }
);
// 同步 如果数据库中没有这个表会自动创建这个表
user.sync();
//先删除后同步
users.sync({
  force: true
});
```

##### 查询多条 findAll(opts) 或者 all（opts）

```js
let list = await model.findAll({
  where: {
    id: { $gt: 10 }, //id大于10
    name: "test" // name等于test
  },
  order: [
      "id",
      ["id","desc"] //根据id倒序排序
  ],
  limit: 10,
  offset: 20,
  attributes:["attr1","attr2"] //返回的字段
});
```

##### 查询一条数据使用findOne（opts）

```js
//根据条件查询一条数据
let model = await test1.findOne({
	where:{
		id:5,
		name:"test"
	}
});
//修改其中的name字段的值
model.name="更新";
//保存,会自动update数据库中的值
model.save();
```

##### 添加新数据 create(model,opts)

```js
await medel.create({})
```


##### 更新数据 update(values, opts)
```js
model.update({
  status: 2
  },{
  where:{ id : 100}
})

```
##### 删除记录 destroy(opts)
```js
await model.destroy({
  where: {
    
  }
})

```

##### 单表操作




##### 联查
```js
//查询主表list的数据
//一条list中的数据对应多条item中的数据
 let data = await models.List.findAll({
	 where:{id:5},//条件,这里jiashe只需查询一条
     include: [{
         model: models.Item,
         as:"items",//返回的对象修改成一个固定的名称
     }]
 });
 let list1=data[0];//返回的第一条数据就是要查询的数据
 let list2=list1.items;//返回子表数据,items是自定义的名称
```

##### 查询数据 findAll()