import {fromJS} from 'immutable';//从immutable中引入fromJS
import * as constants from './constants';
//将数据转换成immutable对象
const defaultState = fromJS({
	topicList:[],
	articleList:[], 
	recommendList:[],
	articlePage:1,
	showScroll:false
})

const changeHomeData = (state,action)=>{
	return state.merge({
		topicList:fromJS(action.topicList),
		articleList:fromJS(action.articleList),
		recommendList:fromJS(action.recommendList)
	});
}

const addRaticleList = (state,action)=>{
	return state.merge({
		articleList:state.get('articleList').concat(action.list),
		articlePage:action.nextPage
	});
}

export default (state=defaultState,action) => {
	switch(action.type){
		case constants.CHANGE_HOME_DATA:
			return changeHomeData(state,action);
		case constants.ADD_ARTICLE_LIST:
			return addRaticleList(state,action);
		case constants.TOGGLE_SCROLL_SHOW:
			return state.set('showScroll',action.show);
		default:
			return state;
	}
}
