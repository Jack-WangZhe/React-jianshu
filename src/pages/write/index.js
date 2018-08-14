import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';//利用Redirect组件实现页面重定向功能

class Write extends PureComponent{
	render(){
		const {loginStatus} = this.props;
		if(loginStatus){
			return(
				<div>写文章页面</div>
			)
		}else{
			return <Redirect to='/login'/>
		}
		
	}
}
const mapStateToProps = (state)=>({
	loginStatus:state.getIn(['login','login'])
})
export default connect(mapStateToProps,null)(Write);