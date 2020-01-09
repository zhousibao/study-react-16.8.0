import React from 'react'

function Com(props) {
  return (
    <div style={{border:"1px solid blue"}}>
      {props.children.top}
      <div>{props.children.footer}</div>
    </div>
  )
}

// 插槽原理
// props.children传递来的是一个合法的表达式
   
export default function Composition() {
  return (
    <div>
      <Com>
        {{
          top:(
            // <Fragment/>的简写
            <> 
              <p>组件复合</p>
              <p>复合组件给与你足够的敏捷去定义自定义组件的外观和行为</p>
            </>
          ),
          footer:(
            <button onClick={() => alert("react确实好")}>确定</button>
          )
        }}
      </Com>
    </div>
  )
}
