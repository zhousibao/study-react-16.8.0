import { createStore ,applyMiddleware} from './redux'
import {logger,thunk} from './middleware'

const counterReducer = function(state = 0, action){
  switch (action.type) {
  case 'add':
    return state + 1
  case 'minus':
    return state - 1
  default:
    return state
  }
}

const store = createStore(counterReducer,applyMiddleware(logger,thunk))
export default store