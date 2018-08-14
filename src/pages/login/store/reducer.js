import * as constants from './constants';
import {fromJS} from 'immutable';//从immutable中引入fromJS
//将数据转换成immutable对象
const defaultState = fromJS({
	login:false
})
export default (state=defaultState,action) => {
	switch(action.type){
		case constants.CHANGE_LOGIN:
			return state.set('login',action.value);
		case constants.LOGOUT:
			return state.set('login',action.value);
		default:
			return state;
	}
}
