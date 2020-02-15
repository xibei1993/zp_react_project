import React, { Component } from 'react'
import {Form,Icon,Input,Button} from 'antd';
import logo from './imgs/logo.png'
import './less/login.less' 
import {reqLogin} from '../../api'
import {connect} from 'react-redux'
import {createSaveUserInfoAction} from '../../redux/actions/login'
import {Redirect} from 'react-router-dom'
const {Item} = Form

class Login extends Component {

	passwordValidator = (rule, value, callback)=>{
	
		if(!value){
			callback('密码必须输入')
		}else if(value.length > 12){
			callback('密码必须小于等于12位')
		}else if(value.length < 4){
			callback('密码必须大于等于4位')
		}else if(!(/^\w+$/).test(value)){
			callback('密码必须是英文、数字或下划线组成')
		}else{
			callback()
		}
	}

	handleSubmit = (event)=>{
		event.preventDefault() 
		this.props.form.validateFields(async(err, values) => {
      if (!err) {
				const {username,password} = values
				let result = await reqLogin(username,password)
				const {status,data,message} = result
				if(status === 0){
					
					this.props.saveUserInfo(data)
					this.props.history.replace('/admin')
				}else{
					message.warning('不好，登录失败咯')
				}
      }
    });

	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const {isLogin} = this.props.userInfo
		if(isLogin) return <Redirect to="/admin"/>
		return (
			<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>动漫世界管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item>
							{
								getFieldDecorator('username', {
									rules: [
										{required: true, message: '用户名必须输入'},
										{max:12,message: '用户名必须小于等于12位'},
										{min:4,message: '用户名必须大于等于4位'},
										{pattern:/^\w+$/,message: '用户名必须是英文、数字、下划线组成'}
									]
								})(
									<Input
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="用户名"
									/>,
								)
							}
						</Item>
						<Item>
							{
								getFieldDecorator('password',{
									rules:[
										{validator:this.passwordValidator}
									]
								})(
									<Input
										prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
										type="password"
										placeholder="密码"
									/>
								)
							}
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}

 export default connect(
	 (state)=>({userInfo:state.userInfo}), {saveUserInfo:createSaveUserInfoAction})(Form.create()(Login))



