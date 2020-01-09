import React from 'react'

function Dialog(props) {
  // 备选消息
  const messages = {
    foo: {title: 'foo', content: 'foo~'},
    bar: {title: 'bar', content: 'bar~'}
  }
  // 执行函数获得要显示的内容
  const {body, footer} = props.children(messages[props.msg]); // props.children是一个函数
  
  return (
    <div style={{ border: "1px solid blue" }}>
      {/* 此处显示的内容是动态生成的 */} 
      {body}
      <div>{footer}</div>
    </div>
  ); 
}
 
export default function Composition() {
  return (
    <>
      {/* 执行显示消息的key */} 
      <Dialog msg="bar">
      {/* 修改为函数形式，根据传入值生成最终内容  */}
        {
          ({title, content}) => ({
            body: (
              <>
                <h1>{title}</h1>
                <p>{content}</p>
              </>
            ),
            footer: <button onClick={() => alert("react确实好")}>确定</button>
          })
        }
      </Dialog>
    </>
  ); 
}
