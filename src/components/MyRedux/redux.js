// redux 的实现原理

export function createStore(reducer, enhancer){
  // 中间件
  if (enhancer) {
    // enhancer 高阶函数
    // 把createStore变强大再执行createStore
    return enhancer(createStore)(reducer)
  }


  // 当前值
  let currentState = undefined;
  // 订阅数据的回调函数集合
  let currentListeners = [];
  // 获取当前状态
  function getState(){
    return currentState
  }
  // 添加订阅
  function subscribe(listener){
    currentListeners.push(listener) 
  }
  // 分发action
  function dispatch(action){
    currentState = reducer(currentState, action)
    currentListeners.forEach(v=>v()) // 执行订阅的回调
    return action
  }
  // 初始化currentState
  dispatch({type:'@IMOOC/KKB-REDUX'}) // 写一个不会设置的actionType设置默认值

  return { getState, subscribe, dispatch}
}


export function applyMiddleware(...middlewares){ 
  return createStore => (...args) => {
    // 完成createStore本该完成的工作
    const store = createStore(...args)
    let dispatch = store.dispatch // 拿出dispatch
    

    // 传递给中间件的参数
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 将来中间件函数： function({}){}  // 参数为一个对象 midApi
    const middlewareChain = middlewares.map(middleware => middleware(midApi)) 

    // 强化dispatch 让它可以按顺序执行中间件函数
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      ...store, dispatch
    } 
  }
}

export function compose(...funcs){
  if (funcs.length === 0) { 
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  // 聚合函数 [fn1,fn2,fn3] => fn3(fn2(fn1()))
  return funcs.reduce((left,right) => (...args) => right(left(...args)))
}