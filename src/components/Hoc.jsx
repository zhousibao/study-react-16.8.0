import React from 'react'

// 傻瓜组件 保持功能单一 不关心数据来源 只负责显示
function Lesson(props) {
  return (
    <div>
      {props.stage} - {props.title}
    </div>
  )
}

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


// 包装
// const LessonWithContent = withContent(Lesson) 
// 可以链式调用
const LessonWithContent = withLog(withContent(Lesson))


export default function Hoc() {
  return (
    <div>
      {[0,0,0].map((item,idx) => 
        <LessonWithContent key={idx} idx={idx} />
      )}
    </div>
  )
}
