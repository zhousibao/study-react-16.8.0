import React, { Component } from "react";
//react中实现递归组件更加纯粹，就是组件递归渲染即可。

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false}
  }
  toggle = () => {
    if (this.isFolder) {
      this.setState(state => ({ open: !state.open })); 
    }
  }

  // 只读，或是是否有子目录
  get isFolder() {
    return this.props.model.children && this.props.model.children.length
  }

  render() {
    return (
      <ul>
        <li>
          <div onClick={this.toggle}> 
            {this.props.model.title}
            {this.isFolder ? (<span>[{this.state.open ? "-" : "+"}]</span> ) : null}
          </div>
          {this.isFolder ? (
            <div style={{ display: this.state.open ? "block" : "none" }}>
              {this.props.model.children.map(model => (<TreeNode model={model} key={model.title} />))}
            </div>
          ) : null}
        </li>
      </ul>
    )
  }
}


export default class Tree extends Component {
  treeData = {
    title: "Web全栈架构师", 
    children: [
      {
        title: "Java架构师"
      }, {
        title: "JS高级", 
        children: [
          {
            title: "ES6"
          }, {
            title: "动效" }
        ]}, {
        title: "Web全栈", 
        children: [
          {
            title: "Vue训练营", expand: true, 
            children: [
              {
                title: "组件化"
              }, {
                title: "源码" },
              {
                title: "docker部署"
              } ]
          }, {
            title: "React",
            children: [
              {
                title: "JSX"
              }, {
                title: "虚拟DOM" }
            ] },
          {
            title: "Node"
          } ]
      } ]
  };
  render() {
    return <TreeNode model={this.treeData} />
  }
}