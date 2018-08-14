import axios from 'axios';
import { fromJS } from 'immutable'
import * as constants from './constants';

const changeHomeData = (result) =>({
	type:constants.CHANGE_HOME_DATA,
	topicList:result.topicList,
	articleList:result.articleList,
	recommendList:result.recommendList
})

const addHomeList = (list,nextPage)=>({
	type:constants.ADD_ARTICLE_LIST,
	list:fromJS(list),//List()可以将普通的数组变成immutable的数组,和fromJS区别在于fromJS可以把对象及内部元素都变成immutable，List是将外层对象变成immutable内层仍是js类型
	nextPage:nextPage
})

export const getHomeInfo = ()=>{
	return (dispatch)=>{
		axios.get('/api/home.json').then((res)=>{
			const result = res.data.data;
			const action = changeHomeData(result);
			dispatch(action);
		})
	}
}

export const getMoreList = (page)=>{
	return (dispatch)=>{
		axios.get('/api/homeList.json?page='+page).then((res)=>{
			const result = res.data.data;
			const action = addHomeList(result,page+1);
			dispatch(action);
		})
	}
}

export const toggleTopShow = (show)=>({
	type:constants.TOGGLE_SCROLL_SHOW,
	show
})