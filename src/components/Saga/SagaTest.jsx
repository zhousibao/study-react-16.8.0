import React, { Component } from 'react'
import {connect} from 'react-redux'
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import { login } from "./store";
import Home from "./Home";

function Produce() {
  return (
    <div>
      <h3>Produce</h3>
      <Link to="add">新增商品</Link>
      <Link to="search">搜索商品</Link>
      <Route path="/produce/add" component={()=><div>add</div>} />
      <Route path="/produce/search" component={()=><div>search</div>} />
      <Redirect to="/produce/add"/>
    </div>
  )
}

const Login = connect(
  state => ({
    isLogin:state.user.isLogin,
    loading: state.user.loading,
    error: state.user.error
  }),
  { login }
)(({ location, isLogin, login, loading, error }) => {
  const redirect = location.state.redirect || "/"; // 重定向地址
  if (isLogin) return <Redirect to={redirect} />;
  
  return (
    <div>
      <p>用户登录</p>
      <hr />
      {/* 显示错误信息 */}
      {error && <p>{error}</p>}
      {/* 登录传参 */}
      <button onClick={() => login('Jerry')} disabled={loading}>
        {loading ? "登录中..." : "登录"}
      </button>
    </div>
  );
})

// 路由守卫 
// 创建PrivateRoute组件包装Route使其具有权限判断功能
const PrivateRoute = connect(
  state => ({
    isLogin: state.user.isLogin
  })
)(({ component: Component, isLogin, ...rest }) => { // 单独解构出component和isLogin
  // component为渲染目标组件，isLogin通常来自Redux // rest为传递给Route的属性
  return (
    <Route
      {...rest} 
      render={
        // props包含match等信息直接传给目标组件 
        props => isLogin ? 
          ( <Component {...props} /> ) : 
          ( <Redirect to={{pathname: "/login", state: { redirect: props.location.pathname } }}/>) 
      }
    />
  ); 
})


export default class SagaTest extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <Link to="produce">商品</Link>
          </nav>

          <br/>

          {/* 路由配置 */}
          {/* react-router匹配不是独占的 */}
          {/* exact 精准查找 */}
          <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/produce" component={Produce}/>
            <Route path="/login" component={Login} />

            {/* 404 */}
            <Route component={() => <h3>页面不存在</h3>}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


