import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import {LoginWrapper,LoginBox,Input,Button} from './style';
import {actionCreators} from './store';
import {Redirect} from 'react-router-dom';//利用Redirect组件实现页面重定向功能

class Login extends PureComponent{
	render(){
		const {loginStatus} = this.props;
		if(!loginStatus){
			return(
				<LoginWrapper>
					<LoginBox>
						<Input placeholder="账号" innerRef={(input)=>{this.account=input}}/>{/*styleComponent组件中ref属性取不到对应的Dom，其提供innerRef取其中的DOM*/}
						<Input placeholder="密码" type='password' innerRef={(input)=>{this.password=input}}/>
						<Button onClick={()=>{this.props.login(this.account,this.password)}}>登录</Button>
					</LoginBox>
				</LoginWrapper>
			)
		}else{
			return <Redirect to='/'/>
		}
		
	}
}
const mapStateToProps = (state)=>({
	loginStatus:state.getIn(['login','login'])
})
const mapDispatchToProps = (dispatch)=>({
	login(accountElem,passwordElem){
		dispatch(actionCreators.login(accountElem.value,passwordElem.value));
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);