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