import React, { Component } from "react";
import {Input,Button} from 'antd'


// 2.扩展表单的高阶组件，提供输入控件包装、事件处理、表单校验等 
function kFormCreate(Comp) {
  return class extends React.Component { 
    constructor(props) {
      super(props); 
      this.options = {};
      this.state = {};
    }
    handleChange = e => {
      let { name, value } = e.target; 
      // 校验:注意回调中调用
      this.setState({ [name]: value }, () => {
        this.validateField(name); 
      });
    };
      
    // 校验指定字段 
    validateField = field => {
      // 获取校验规则
      const rules = this.options[field].rules;

      // 只要有任何一项校验失败就返回true跳出，对返回值取反表示校验失败 
      const ret = !rules.some(rule => {
        // 仅验证必填项 
        if (rule.required) {
          // 错误信息设置
          if (!this.state[field]) {
            // 校验失败 
            this.setState({
              [field + "Message"]: rule.message 
            });

            return true; // 若有校验失败，返回true 
          }
          return false
        }
        return false
      });
      
      // 若校验成功，清除错误信息
      if (ret) this.setState({ [field + "Message"]: "" }); 
      return ret;
    };
    // 校验所有字段  // 回调函数的方式
    validateFields = cb => {
      // 将选项中所有field组成的数组转换为它们校验结果数组
      Object.keys(this.options).map(field => this.validateField(field)); // 查找全部
      // every函数有一个返回true 就会跳出循环
      const ret = Object.keys(this.options).every(field => this.validateField(field)); 
      cb(ret, this.state); 
    }

    getFieldDec = (field, option) => {
      this.options[field] = option;

      // 返回一个装饰器 // 高阶组件 
      return InputComp => (
        <div>
          {React.cloneElement(
            InputComp, 
            {
              name: field,
              value: this.state[field] || "",
              onChange: this.handleChange
            }
          )}
          {/* 添加一个校验提示信息 */} 
          {
            this.state[field + "Message"] 
            && ( <p style={{ color: "red" }}>{this.state[field + "Message"]}</p> )
          }
        </div>
      ); 
    };

    render() {
      return (
        <div>
          {/* 添加校验属性 */}
          <Comp {...this.props} getFieldDec={this.getFieldDec} validateFields={this.validateFields}/>
        </div>
      )
    }

  }
}


@kFormCreate
class KFormTest extends Component {
  onSubmit = () => {
    // 校验、提交 
    this.props.validateFields((isValid, data) => {
      if (isValid) { 
        console.log("提交登录", data);
      } else { 
        console.log("校验失败");
      } 
    })
  }
  render() {
    // 结构出扩展的方法
    const { getFieldDec } = this.props; 
    return (
      <div>
        {getFieldDec("uname", { rules: [{ required: true, message: "请输入用户名" }]})(<Input type="text" />)}
        {getFieldDec("pwd", {rules: [{ required: true, message: "请输入密码" }] })(<Input type="password" />)}
        <Button onClick={this.onSubmit}>登录</Button>
      </div>
    )
  }
}
export default KFormTest