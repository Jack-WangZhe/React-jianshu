import React,{PureComponent} from 'react';
import {TopicWrapper,TopicItem} from '../style';
import {connect} from 'react-redux';

class Topic extends PureComponent{
	render(){
		const {list} = this.props;
		return(
			<TopicWrapper>
			{
				list.map((item,index) => (
						<TopicItem key={item.get('id')}>
							<img 
								className='topic-pic'
								src={item.get('imgUrl')}
								alt=''
							/>
							{item.get('title')}
						</TopicItem>
				))
			}
					
			</TopicWrapper>
		)
	}
}
const mapStateToProps = (state)=> ({
	list:state.getIn(['home','topicList']),
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps,mapDispatchToProps)(Topic);