import {fromJS} from 'immutable';//从immutable中引入fromJS
import * as constants from './constants';
//将数据转换成immutable对象
const defaultState = fromJS({
	title:'',
	content:''
})

export default (state=defaultState,action) => {
	switch(action.type){
		case constants.CHANGE_DETAIL:
			return state.merge({
				title:action.title,
				content:action.content
			})
		default:
			return state;
	}
}
