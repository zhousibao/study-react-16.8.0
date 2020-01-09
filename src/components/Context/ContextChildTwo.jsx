import React from 'react'

export default function ContextChildTwo(props) {
  const {counter, add} = props
  return (
    <div>
      <br/>
      <div onClick={() => add()}>使用Consumer方式:{counter}</div>
    </div>
  )
}
