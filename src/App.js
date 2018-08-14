import React,{Component} from 'react';
import Header from './common/header';
import {BrowserRouter,Route} from 'react-router-dom';
import store from './store'
import {Provider} from 'react-redux';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';//Detail即会成为异步组件
import Login from './pages/login';
import Write from './pages/write';

class App extends Component{
	render(){
		return(
			<Provider store={store}>{/*Provider将store的数据提供给内部的Header组件*/}
				<BrowserRouter>
					<div>{/*在外层包div，保证BrowserRouter中的内容都在一个标签中*/}
						<Header />
						<Route path="/" exact component={Home}></Route>{/*exact属性如果添加，则表示路径必须完全匹配才显示*/}
						<Route path="/detail/:id" exact component={Detail}></Route>
						<Route path="/login" exact component={Login}></Route>
						<Route path="/write" exact component={Write}></Route>
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}
export default App;