import React, { Component } from 'react'
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom'


// 16版本以前
export default class DialogOne extends Component {
  // 创建方法
  createPortal(props) {
    unstable_renderSubtreeIntoContainer(
      this,  // 当前组件
      <div className="dialog">{props.children}</div>,// 塞进传送门的JSX 
      this.node // 传送门另一端的DOM node
    ); }


  componentDidMount() {
    this.node = document.createElement("div"); 
    document.body.appendChild(this.node);
    this.createPortal(this.props); 
  }
  componentDidUpdate() { 
    this.createPortal(this.props);
  }
  componentWillUnmount() { 
    unmountComponentAtNode(this.node); 
    document.body.removeChild(this.node);
  }
  render() {
    return null
  }
}
