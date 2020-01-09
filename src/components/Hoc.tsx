import React from 'react'

// 模拟数据
const lessons = [
  { stage: "React", title: "核心API" }, 
  { stage: "React", title: "组件化1" }, 
  { stage: "React", title: "组件化2" }
]

// 定义高阶组件
// 包装后的组件传入参数，根据该参数获取数据
const withContent = Comp => props => {
  const content = lessons[props.idx]
  return <Comp {...content} /> 
}
// withLog高阶组件，能够在组件挂载的时候输出日志
const withLog = Comp => {
  return class extends React.Component {
    componentDidMount(){
      console.log('didMount:',this.props)
    }
    render(){
      return (
        <Comp {...this.props}/>
      )
    }
  }
}


// 装饰器语法  es7   // 装饰器只能用于class组件 
// 先后顺序是：从下往上
@withLog
@withContent
class Lesson extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        {this.props.stage} - {this.props.title}
      </div>
    )
  }
}



export default function Hoc() {
  return (
    <div>
      {[0,0,0].map((item,idx) => 
        <Lesson key={idx} idx={idx} />
      )}
    </div>
  )
}
