import React, { Component, useState, useEffect } from 'react'

class Clock extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
      count:0
    }
  }
  
  componentDidMount(){
    // this.setState({count:this.state.count + 1})

    this.setState((state) => {
      console.log('updater',state.count) // 0
      return {count:state.count + 1}
    },() => {
      console.log('updater callback',this.state.count) // 1
    })

    this.setState((state) => {
      console.log('updater',state.count) // 1
      return {count:state.count + 1}
    },() => {
      console.log('updater callback',this.state.count) // 1
    })

    // this.setState({count:this.state.count + 1},() => {
    //   console.log('callback',this.state.count) // 1
    // })

    console.log(this.state.count) // 0 // 异步执行

    this.timerId = setInterval(() => {
      this.setState({
        date: new Date(),
        //count:2
      })
      // console.log('setInterval',this.state.count) // 2 // 同步执行
    },1000)
    
  }
  componentWillUnmount(){
    clearInterval(this.timerId)
  }


  render() {
    const {date,count} = this.state
    return (
      <div>
        <p>{date.toLocaleTimeString()}</p>
        <p>{count}</p>
      </div>
      
    )
  }
}


// 函数组件管理useState、useEffect
// hooks 只能在16.8.x以后使用  代码简洁
function ClockFunction() {
  // 创建状态 useState返回 状态和修改状态的函数 所组成的数组
  const [date,setDate] = useState(new Date())

  // 定时器是副作用 需要用到useEffect
  useEffect(() => {
    const timerId = setInterval(() => {
      // 更新状态
      setDate(new Date())
    },1000)

    // 取消定时器
    return () => {
      clearInterval(timerId)
    }
  },[]) // 参数2 表示依赖状态，即什么时候执行useEffect    本例中没有依赖且直执行一次，放一个[]


  return (
    <div>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}





export default function State() {
  return (
    <div>
      <Clock/>
      <br/>
      <ClockFunction/>
    </div>
  )
}
