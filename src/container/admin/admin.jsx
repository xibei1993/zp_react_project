import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/actions/login'

class Admin extends Component {
	logout = ()=>{
		this.props.deleteUserInfo()
	}
	render() {
		const {isLogin} = this.props.userInfo
		if(!isLogin) return <Redirect to="/login"/>
		return (
			<div>
				欢迎登录，{this.props.userInfo.user.username}
				<button onClick={this.logout} >退出登录</button>
			</div>
		)
	}
}

export default connect(
	(state)=>({userInfo:state.userInfo}), 
	{deleteUserInfo:createDeleteUserInfoAction} 
)(Admin)
