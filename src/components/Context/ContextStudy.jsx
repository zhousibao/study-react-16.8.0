import React, { Component } from 'react'
import { Provider,Consumer } from './ContextValue'
import ContextChild from './ContextChild'


export default class ContextStady extends Component {
  constructor(props){
    super(props)

    this.state= {
      counter: 0
    }
  }

  add = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
       
  render() {
    return (
      <Provider value={{counter:this.state.counter,add: this.add}}>
        <Consumer>{ value => <ContextChild {...value}/> }</Consumer>
      </Provider>
    )
  }
}
