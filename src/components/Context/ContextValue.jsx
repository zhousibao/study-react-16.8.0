import React from 'react'
const obj = {
  counter:0,
  add:null
}
// 创建上下文
export const Context = React.createContext(obj)
export const Provider = Context.Provider
export const Consumer = Context.Consumer