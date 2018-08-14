import React,{PureComponent} from 'react';//PurComponent内在自己底层实现了shouldComponentUpdate，提升组件性能。必须和immutable管理数据同时使用。
import { connect } from 'react-redux';
import { HomeWrapper,HomeLeft,HomeRight } from './style';
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { actionCreators } from './store';
import {BackTop} from './style'
class Home extends PureComponent{
	handleScrollTop(){
		window.scrollTo(0,0);
	}

	render(){
		return(
			<HomeWrapper>
				<HomeLeft>
					<img className="banner-img" src="https://upload.jianshu.io/admin_banners/web_images/4381/3cdf43257e95766122959099cd4b41b495e6adfc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=''/>
					<Topic/>
					<List/>
				</HomeLeft>
				<HomeRight>
					<Recommend/>
					<Writer/>
				</HomeRight>
				{this.props.showScroll?<BackTop onClick={this.handleScrollTop}>顶部</BackTop>:null}
			</HomeWrapper>
		)
	}
	componentDidMount(){
		this.props.changeHomeData();//作为UI组件最好不要有逻辑处理，故将逻辑处理内容放到actionCreator中创建
		this.bindEvents();
	}
	componentWillUnMount(){
		window.removeEventListener('scroll',this.props.changeScrollTopShow);//在组件被销毁的时候将对window绑定的事件移除
	}
	bindEvents(){
		window.addEventListener('scroll',this.props.changeScrollTopShow);//想window上绑定监听事件
	}

}
const mapStateToProps = (state)=>({
	showScroll:state.getIn(['home','showScroll'])
})

const mapDispatchToProps =  (dispatch)=>({
	changeHomeData(){
		dispatch(actionCreators.getHomeInfo());
	},
	changeScrollTopShow(e){
		if(document.documentElement.scrollTop>100){//滑动高度
			dispatch(actionCreators.toggleTopShow(true));
		}else{
			dispatch(actionCreators.toggleTopShow(false));
		}
	}

})

export default connect(mapStateToProps,mapDispatchToProps)(Home);