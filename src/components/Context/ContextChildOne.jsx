import React, { Component } from 'react'
import {Context} from './ContextValue'

export default class ContextChildOne extends Component {

  static contextType = Context;
  render() {
    const {counter, add} = this.context

    return (
      <div>
        <br/>
        <p onClick={() => add()}>使用contextType方式:{counter}</p>
      </div>
    )
  }
}

// 或者在这里关联定义contextType
// ContextChildOne.contextType = Context
