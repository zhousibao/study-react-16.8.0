// 快捷键rcc 类组件
import React, { Component } from 'react'
import style from './home.module.css'

export default class Home extends Component {
  render() {
    const hello = <p className={style.title}>react 你好帅</p>
    return (
      <div>
        {hello}
      </div>
    )
  }
}
