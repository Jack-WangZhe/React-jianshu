import { combineReducers } from 'redux-immutable'; //redux-immutable的combineReducers函数可以帮我们把小的reducer合并成大的reducer
import {reducer as headerReducer} from '../common/header/store';//自动找文件夹下的index.js
import {reducer as homeReducer} from '../pages/home/store';
import {reducer as detailReducer} from '../pages/detail/store';
import {reducer as loginReducer} from '../pages/login/store';
//合并方式
//利用redux-immutable的combineReducers生成的数据内容是immutable对象
const reducer = combineReducers({
	header: headerReducer,/*取时应是state.header.对应数据*/
	home: homeReducer,
	detail:detailReducer,
	login:loginReducer
});

export default reducer;
