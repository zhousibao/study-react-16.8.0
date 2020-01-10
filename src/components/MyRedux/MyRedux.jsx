import React, { Component } from 'react'
import store from './store'

export default class ReduxTest extends Component {
  componentDidMount(){
    // 添加订阅
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    // 删除订阅
    this.unsubscribe()
  }
  render() {
    return (
      <div>
        <p>MyRedux</p>
        {store.getState()}
        <div>
          <button onClick={() => store.dispatch({type:'add'})}>+</button>
          <button onClick={() => store.dispatch({type:'minus'})}>-</button>
          <button onClick={() => store.dispatch(function(){
            setTimeout(() => {
              store.dispatch({type:'add'})
            },1000)
          })}>异步+</button>
        </div>
      </div>
    )
  }
}
