import React, { Component } from 'react'
import {createBrowserHistory} from 'history'
import matchPath from './matchPath'

// 创建一个上下文 保存history、location等
const RouterContext = React.createContext();

// BrowserRouter:历史记录管理对象history初始化及向下传递，location变更监听
class BrowserRouter extends Component {
  constructor(props){
    super(props)
    // 创建浏览器的history对象
    this.history = createBrowserHistory(this.props);
    // 创建状态管理 location
    this.state = {
      location:this.history.location
    }
    // 开启监听
    this.unlisten = this.history.listen(location => { 
      this.setState({ location });
    });
  }
  componentWillUnmount(){
    // 解除监听
    if(this.unlisten){
      this.unlisten()
    }
  }
  render() {
    return (
      <RouterContext.Provider
        children={this.props.children || null} 
        value={{
          history: this.history,
          location: this.state.location 
        }}
      />
    )
  }
}

// Route:路由配置，匹配检测，内容渲染
class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {


          const location = context.location;
          const match = matchPath(location.pathname, this.props)
          console.log(match)

          // 要传递给下去的属性
          const props = { ...context, match };

          // 竞争关系  优先级 children > component > render
          // children 匹不匹配都会执行
          // component、render 匹配了才执行
          let { children, component, render } = this.props;
          if (children && typeof children === "function") {
            children = children(props);
          }
          //console.log(props)

          return (
            <RouterContext.Provider value={props}>
              {/* children 匹不匹配都会执行 */}
              {children && React.Children.count(children) > 0 ? children   
                : props.match
                // component和render必须匹配才会执行
                  ? component
                    ? React.createElement(component, props) : render
                      ? render(props)
                      : null
                  : null} </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    )
  }
}

class Link extends React.Component {
  handleClick(event, history) {
    event.preventDefault();
    history.push(this.props.to);
  }

  render() {
    const { to, ...rest } = this.props;

    return (
      <RouterContext.Consumer>
        {context => {
          return (
            <a
              {...rest}
              onClick={event => this.handleClick(event, context.history)}
              href={to}
            >
              {this.props.children}
            </a>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}


export default class MyRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <p>MyRouter</p>
        <Link to="/foo">foo</Link>
        <Link to="/bar">bar</Link>
        <Link to="/mua/abc">mua</Link>

        <hr/>
        <Route path="/foo" component={() => <div>foo</div>}/>
        <Route path="/bar" component={() => <div>bar</div>}/>
        <Route path="/mua/:ns" render={({ match }) => match.params.ns} />
        <Route children={({location}) => "xxx"} />
      </BrowserRouter>
    )
  }
}
