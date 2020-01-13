import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from "redux-saga";

import counter from '@/components/ReactRedux/store.js'
import user from '@/components/Saga/store.js'
import mySaga from "@/components/Saga/sagas";

// 创建saga中间件并注册
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  counter,
  user
});


const store = createStore(rootReducer,applyMiddleware(logger,thunk,sagaMiddleware))

// 中间件运行saga 
sagaMiddleware.run(mySaga);

export default store

// createStore 创建store
// reducer 初始化store, 修改状态的函数
// getState 获取状态值
// dispatch 提交更新
// subscribe 变更订阅 