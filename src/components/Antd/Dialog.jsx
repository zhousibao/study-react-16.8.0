import React, { Component } from 'react'
import { createPortal } from 'react-dom'
 
// 16版本以后的实现方式
export default class Dialog extends Component {
  constructor(props){
    super(props)

    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }

  componentWillUnmount(){
    // 删除dom
    document.body.removeChild(this.node)
  }
  render() {
    //传送 JSX 至 DOM node
    return createPortal(
      <div className="dialog"> {this.props.children} </div>, 
      this.node 
    )
  }
}
