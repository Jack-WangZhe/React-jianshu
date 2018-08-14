import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import {DetailWrapper,Header,Content} from './style';
import {actionCreators} from './store';
import {withRouter} from 'react-router-dom';

class Detail extends PureComponent{
	render(){
		const {title,content} = this.props;
		return(
			<DetailWrapper>
				<Header>{title}</Header>
				<Content dangerouslySetInnerHTML={{__html:content}}/>{/*dangerouslySetInnerHTML={{__html:content}}可以保证content的内容不被转译*/}
			</DetailWrapper>
		)
	}
	componentDidMount(){
		this.props.getDetail(this.props.match.params.id);
	}
}
const mapStateToProps = (state)=>({
	title:state.getIn(['detail','title']),
	content:state.getIn(['detail','content'])
});
const mapDispatchToProps = (dispatch)=>({
	getDetail(id){
		dispatch(actionCreators.getDetail(id));
	}
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Detail));//withRouter(Detail)表示让Detail有能力获取router中所有参数和内容