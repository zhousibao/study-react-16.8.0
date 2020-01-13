import React from 'react'
import ReactDom from 'react-dom'
import'./index.css'  // 全局加载
// import style from './index.module.css' // 模块加载 ***.module.css

// React : 逻辑控制， 数据 -> vdom
// ReactDom: 页面渲染， vdom -> dom

import {Provider} from 'react-redux'
import store from './store.js'

import App from './App'

ReactDom.render(  <Provider store={store}><App/></Provider> ,document.getElementById('root'))