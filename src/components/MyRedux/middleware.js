// 自定义中间件
export function logger({dispatch, getState}){
  // 返回真正的中间件执行函数
  return dispatch => action => {
    // 中间件任务
    console.log(action.type + '执行了!!'); 
    // 下一个中间件
    return dispatch(action);
  }
}

// thunk中间件 // 增加了处理函数action的能力
export const thunk = ({dispatch, getState}) => dispatch => action => {
  // 异步的action 返回函数
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  // 不是函数直接跳过
  return dispatch(action)
}
export default thunk