import React, { Component } from 'react'

export default class Event extends Component {
  constructor(props){
    super(props)

    this.state = {
      eventType:null
    }
  }
  onClick = (event) => {
    console.log(event); // => nullified object.
    console.log(event.type); // => "click"
    const eventType = event.type; // => "click"

    setTimeout(function() {
      console.log(event.type); // => null
      console.log(eventType); // => "click"
    }, 0);

    // 不起作用，this.state.clickEvent 的值将会只包含 null
    this.setState({clickEvent: event}); // 会报错

    // 你仍然可以导出事件属性
    this.setState({eventType: event.type});
  }
  render() {
    return (
      <div>
        <p>eventType :{this.state.eventType}</p>
        <button onClick={this.onClick}>点击</button>
      </div>
    )
  }
}
