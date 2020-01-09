import React, { Component } from 'react'
import { Form,Input,Checkbox,Button,Icon} from 'antd'

class LoginForm extends Component {


  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err,values) => {
      if(!err){
        console.log('values:',values)
      }
    })
  }

  render() {
    // this.props 由Form.create装饰器包装得到
    // console.log(this.props)

    // getFieldDecorator 装饰器工厂 生成一个装饰器
    // 作用：生成字段名称、规则校验
    const { getFieldDecorator } = this.props.form;
    

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }
}


// 包装LoginForm
const FormTest = Form.create({ name: "normal_login" })(LoginForm);
export default FormTest;
