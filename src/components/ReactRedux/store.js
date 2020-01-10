import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const counterReducer = function(state = 0, action){
  const num = action.payload || 1
  switch (action.type) {
  case 'add':
    return state + num
  case 'minus':
    return state - 1
  default:
    return state
  }
}

const store = createStore(counterReducer,applyMiddleware(logger,thunk))
export default store

// createStore 创建store
// reducer 初始化store, 修改状态的函数
// getState 获取状态值
// dispatch 提交更新
// subscribe 变更订阅 