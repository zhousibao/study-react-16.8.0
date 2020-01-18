// import React from 'react'
// import ReactDom from 'react-dom'
// import'./index.css'  // 全局加载
// import style from './index.module.css' // 模块加载 ***.module.css

// React : 逻辑控制， 数据 -> vdom
// ReactDom: 页面渲染， vdom -> dom

// import {Provider} from 'react-redux'
// import store from './store.js'

// import App from './App'
// ReactDom.render(  <Provider store={store}><App/></Provider> ,document.getElementById('root'))


/**
 * MyReact
 * 
 */
// import MyReact from "./components/MyReact/MyReact";
import React, { Component } from "./components/MyReact/react";
import ReactDom from "./components/MyReact/react-dom";

class Comp2 extends Component{
  render(){
    return (
      <h2>hi, class comp!</h2>
    )
  }
}

function Comp(props){
  return (
    <h2>你好，{props.name}</h2>
  )
}
const jsx = (
  <div id="demo">
    <p>hi</p>
    <Comp name="周"/>
    <Comp2/>
  </div>
)
console.log(jsx)
ReactDom.render(jsx ,document.getElementById('root'))
