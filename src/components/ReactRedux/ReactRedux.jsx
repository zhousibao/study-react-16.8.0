import React, { Component } from 'react'
import { connect } from 'react-redux'


// 参数1: mapStateToProps = state => { return {num:state}}
// 参数2: mapDispatchToProps = dispatch => { return { add: () => dispatch({type:'add'})}}
@connect(
  state => ({num:state}),
  // 简洁写法
  {
    // 同步返回对象
    add:(num) => ({type:'add', payload:num}), // action creator 带有参数
    minus:() => ({type:'minus'}), // action creator // 没有参数
    // 异步返回函数
    asyncAdd:(num) => dispatch => {
      setTimeout(() => {
        dispatch({type:'add', payload:num})
      },1000)
    },
    asyncMinus:() => dispatch => {
      setTimeout(() => {
        dispatch({type:'minus'})
      },1000)
    }
  } 
  // 完整写法
  // dispatch => ({
  //   add:() => dispatch({type:'add'}),
  //   minus:() => dispatch({type:'minus'})
  // })
)
class ReactRedux extends Component {
  render() {
    return (
      <div>
        {this.props.num}
        <div>
          <button onClick={() => this.props.add(2)}>+</button>
          <button onClick={this.props.minus }>-</button>
        </div>
        <br/>
        <div>
          <button onClick={() => this.props.asyncAdd(2)}>异步+</button>
          <button onClick={this.props.asyncMinus }>异步-</button>
        </div>
      </div>
    )
  }
}

export default ReactRedux