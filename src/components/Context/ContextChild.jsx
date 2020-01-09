import React from 'react'
import ContextChildOne from './ContextChildOne'
import ContextChildTwo from './ContextChildTwo'
import { Consumer } from './ContextValue'

export default function ContextChild(props) {
  // console.log(props)
  return (
    <div>
      <div>
        <p>ContextChild:{props.counter}</p>

        {/* 使用contextType方式 */}
        <ContextChildOne/>

        {/* 使用Consumer方式 */}
        <Consumer>
          {value => <ContextChildTwo {...value}/>}
        </Consumer>
      </div>
    </div>
  )
}
