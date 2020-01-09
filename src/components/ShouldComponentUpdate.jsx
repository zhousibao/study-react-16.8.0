import React, { Component,PureComponent } from 'react'

export default class ShouldComponentUpdate extends Component {
  constructor(props) { 
    super(props); 
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    this.timerId = setInterval(() => { 
      this.setState({ comments: [
        { body: "react", author: "facebook" },
        { body: "vue", author: "youyuxi" }
      ]});
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timerId)
  }
  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => ( <Comment key={i} data={c} />))}

        {this.state.comments.map((c, i) => ( <CommentOne key={i} data={c} />))}

        {this.state.comments.map((c, i) => ( <CommentTwo key={i} {...c} />))}

        {this.state.comments.map((c, i) => ( <CommentThree key={i} {...c} />))}
      </div>
    )
  }
}

function Comment({data:{ body, author }}){
  console.log('普通渲染')
  return (
    <div>{body} --- {author}</div>
  )
}

class CommentOne extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { body, author } = nextProps.data
    if (body === this.props.data.body && author === this.props.data.author) {
      return false;
    }
    return true;
  }
  render() {
    console.log('shouldComponentUpdate渲染')
    const {body,author} = this.props.data
    return (
      <div>{body} --- {author}</div>
    )
  }
}

class CommentTwo extends PureComponent { 
  render() { 
    console.log('PureComponent渲染')
    const {body,author} = this.props
    return (
      <div>{body} --- {author}</div>
    );
  }
}

const CommentThree = React.memo(function({ body, author }) { 
  console.log("memo渲染");
  return (
    <div>{body} --- {author}</div>
  ) 
})
