### react生命周期

![生命周期](./lifecycle.png)
[生命周期博客](https://juejin.im/post/5b6f1800f265da282d45a79a)
> 注意点,废弃了三个生命周期
- ~~componentWillMount~~
- ~~componentWillReceiveProps~~
- ~~componentWillUpdate~~
> 新增了两个生命周期
- static getDerivedStateFromProps
- getSnapshotBeforeUpdate



### redux
```js
function SelfReducer(state = states, action: any): object {
    const { type, info } = action
    switch (type) {
        case SELF_USER:
            return {
                ...state,
                self: info
            }
        default:
            return state
    }
}
const store = createStore(SelfReducer)
```

上面的`states`是一个默认状态，`action`是`dispatch`的
```js
export function changeSelf(info: object){
    return {
        info,
        type: SELF_USER
    }
}
```