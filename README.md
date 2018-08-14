## React项目实战——简书网站开发

- 项目目录搭建

  - 利用脚手架工具搭建React项目：`create-react-app jianshu`

  - css在一个组件中通过`import './index.css'`引入，则在所有组件中全部生效，会遇到css定义重复的情况。故我们应用`styled-components`组件进行管理。

    - 安装组件：`yarn add styled-components`

    - 使用：

      - 将index.css文件变成style.js，即将css文件变成js文件，并由其他文件引入

      - 通过styled-components的injectGlobal生成全局样式

        应用实例：[请注意编写规范]

        ```js
        //[style.js]
        import {injectGlobal} from 'styled-components';
        injectGlobal`
        	body{
        		margin:0;
        		padding:0;
        		font-family:sans-serif;
        		background:green;
        	}	
        `
        
        //[index.js]
        import React from 'react';
        import ReactDOM from 'react-dom';
        import './style.js';
        import App from './App';
        ReactDOM.render(<App />, document.getElementById('root'));
        ```

      - 由于不同浏览器的内核中对标签默认样式的设置是不同的，为了使代码在所有浏览器上的形式一致，则需要使用**reset.css**对样式进行统一。引入**reset.css**后，所有标签的margin、padding等样式即做到统一。[reset.css是一段代码，百度搜索 reset.css即可找到[https://meyerweb.com/eric/tools/css/reset/](https://meyerweb.com/eric/tools/css/reset/)]

        应用实例：

        ```js
        //[style.js]
        import {injectGlobal} from 'styled-components';
        injectGlobal`
        	html, body, div, span, applet, object, iframe,
        	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        	a, abbr, acronym, address, big, cite, code,
        	del, dfn, em, img, ins, kbd, q, s, samp,
        	small, strike, strong, sub, sup, tt, var,
        	b, u, i, center,
        	dl, dt, dd, ol, ul, li,
        	fieldset, form, label, legend,
        	table, caption, tbody, tfoot, thead, tr, th, td,
        	article, aside, canvas, details, embed, 
        	figure, figcaption, footer, header, hgroup, 
        	menu, nav, output, ruby, section, summary,
        	time, mark, audio, video {
        		margin: 0;
        		padding: 0;
        		border: 0;
        		font-size: 100%;
        		font: inherit;
        		vertical-align: baseline;
        	}
        	/* HTML5 display-role reset for older browsers */
        	article, aside, details, figcaption, figure, 
        	footer, header, hgroup, menu, nav, section {
        		display: block;
        	}
        	body {
        		line-height: 1;
        	}
        	ol, ul {
        		list-style: none;
        	}
        	blockquote, q {
        		quotes: none;
        	}
        	blockquote:before, blockquote:after,
        	q:before, q:after {
        		content: '';
        		content: none;
        	}
        	table {
        		border-collapse: collapse;
        		border-spacing: 0;
        	}
        `
        ```

- 利用styled-components完成Header组件布局

  - 使用styled-components的好处：样式都写在style.js文件中，实际上是一个个组件，不会影响其他页面组件的样式，避免css冲突的问题。
  - 实例代码：

  ```js
  //[index.js]
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './style.js';
  import App from './App';
  ReactDOM.render(<App />, document.getElementById('root'));
  
  //[style.js]
  import {injectGlobal} from 'styled-components';
  injectGlobal`
  	html, body, div, span, applet, object, iframe,
  	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  	a, abbr, acronym, address, big, cite, code,
  	del, dfn, em, img, ins, kbd, q, s, samp,
  	small, strike, strong, sub, sup, tt, var,
  	b, u, i, center,
  	dl, dt, dd, ol, ul, li,
  	fieldset, form, label, legend,
  	table, caption, tbody, tfoot, thead, tr, th, td,
  	article, aside, canvas, details, embed, 
  	figure, figcaption, footer, header, hgroup, 
  	menu, nav, output, ruby, section, summary,
  	time, mark, audio, video {
  		margin: 0;
  		padding: 0;
  		border: 0;
  		font-size: 100%;
  		font: inherit;
  		vertical-align: baseline;
  	}
  	/* HTML5 display-role reset for older browsers */
  	article, aside, details, figcaption, figure, 
  	footer, header, hgroup, menu, nav, section {
  		display: block;
  	}
  	body {
  		line-height: 1;
  	}
  	ol, ul {
  		list-style: none;
  	}
  	blockquote, q {
  		quotes: none;
  	}
  	blockquote:before, blockquote:after,
  	q:before, q:after {
  		content: '';
  		content: none;
  	}
  	table {
  		border-collapse: collapse;
  		border-spacing: 0;
  	}
  `
  
  //[App.js]
  import React,{Component} from 'react';
  import Header from './common/header';
  class App extends Component{
  	render(){
  		return(
  			<Header />
  		)
  	}
  }
  export default App;
              
  //[common/header/index.js]
  import React , {Component} from 'react';
  import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button} from './style';
  class Header extends Component{
  	render(){
  		return (
  			<HeaderWrapper>
  				<Logo /> {/*可以写href属性*/}
  				<Nav>
  					<NavItem className="left active">首页</NavItem>
  					<NavItem className="left">下载App</NavItem>
  					<NavItem className="right">登录</NavItem>
  					<NavItem className="right">Aa</NavItem>
  					<NavSearch/>
  				</Nav>
  				<Addition>
  					<Button className="writing">写文章</Button>
  					<Button className="reg">注册</Button>
  				</Addition>
  			</HeaderWrapper>
  		)
  	}
  }
  export default Header;
      
  //[common/header/style.js]
  import styled from 'styled-components';
  import logoPic from '../../statics/logo.png';//webpack打包时会将图片打包成logopic
  //创建HeaderWrapper组件（其实就是div），内部写div相关样式
  export const HeaderWrapper = styled.div`
  	position:relative;
  	height:56px;
  	border-bottom:1px solid #f0f0f0;
  `
  export const Logo = styled.a.attrs({
  	href:'/'
  })`
  	position:absolute;
  	top:0;
  	left:0;
  	display:block;
  	width:100px;
  	height:56px;
  	background:url(${logoPic});//多行文本嵌变量
  	background-size:contain;//使背景图片完全覆盖
  `
  export const Nav = styled.div`
  	width:960px;
  	padding-right:70px;
  	box-sizing:border-box;
  	margin:0 auto;
  	height:100%; 
  `
  export const NavItem=styled.div`
  	line-height:56px;
  	padding:0 15px;
  	font-size:17px;
  	color:#333;
  	//&.left表示组件的className是left则具备下述css
  	&.left{
  		float:left;
  	}
  	&.right{
  		float:right;
  		color:#969696;
  	}
  	&.active{
  		color:#ea6f5a;	
  	}
  `
  
  export const NavSearch=styled.input.attrs({
  	placeholder:'搜索'
  })`
  	width:160px;
  	height:38px;
  	padding:0 20px;
  	margin-top:9px;
  	margin-left:20px;
  	box-sizing:border-box;
  	border:none；
  	outline:none;
  	border-radius:19px;
  	background:#eee;
  	font-size:14px;
  	&::placeholder{//表示组件下的placeholder进行css设置
  		color:#999;
  	}
  `
  export const Addition=styled.div`
  	position:absolute;
  	right:0;
  	top:0;
  	height:56px;
  `
  export const Button=styled.button`
  	float:right;
  	line-height:38px;
  	border-radius:19px;
  	margin-top:9px;
  	border:1px solid #ec6149;
  	margin-right:20px;
  	padding:0 20px;
  	font-size:14px;
  	&.reg{
  		color:#ec6149;
  	}
  	&.writing{
  		color:#fff;
  		background:#ec6149;
  	}
  `
  
  //[statics]文件夹下放置logo图片
  ```

  （1）给标签添加属性等同于在style.js中定义是styled.元素类型.attrs({属性名：属性值})\`css样式\`

  （2）获得引入的图片：使用${图片引入名}

  （3）指定类样式：&.className名{css样式}

  （4）给属性设置样式：&::属性名{css样式}

  - 总结：使用styled-components第三方模块，实现带样式的组件，组件的样式独享，解决了组件css样式冲突的问题。

- 使用iconfont嵌入头部图标

  - iconfont：阿里巴巴矢量图

  - iconfont操作：创建项目图标库、选中图标添加入库、下载到本地

  - 下载后的有效文件：iconfont.eot、iconfont.svg、iconfont.ttf、iconfont.woff、iconfont,css

  - iconfont的使用：

    - 将上述五个有效文件加入到static/iconfont文件夹下

    - 修改iconfont.css中@face-face的地址为相对路径（及url开头的路径前面加`./` ；data开头的不用修改，是base64的编码）并删去部分样式。最终将iconfont样式改变成全局样式，修改iconfont.css变成iconfont.js:

      ```js
      import {injectGlobal} from 'styled-components';
      
      injectGlobal`
        @font-face {font-family: "iconfont";
          src: url('./iconfont.eot?t=1533812894327'); /* IE9*/
          src: url('./iconfont.eot?t=1533812894327#iefix') format('embedded-opentype'), /* IE6-IE8 */
          url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
          url('./iconfont.ttf?t=1533812894327') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
          url('./iconfont.svg?t=1533812894327#iconfont') format('svg'); /* iOS 4.1- */
        }
      
        .iconfont {
          font-family:"iconfont" !important;
          font-size:16px;
          font-style:normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      ``
      ```

    - 在index.js中引入该文件

    - 使用：`<i className="iconfont">&#xe636;</i>`中间内容值在下载的demo_unicode.html中个可以查询，即表示对应的图标。【也可以到账号的项目中查看图标的值】

  - 实例代码：

    ```js
    //[common/header/index.js]添加icon，并在NavSearch组件外部包裹SearchWapper保证可以添加放大镜icon
    import React , {Component} from 'react';
    import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper} from './style';
    class Header extends Component{
    	render(){
    		return (
    			<HeaderWrapper>
    				<Logo /> {/*可以写href属性*/}
    				<Nav>
    					<NavItem className="left active">首页</NavItem>
    					<NavItem className="left">下载App</NavItem>
    					<NavItem className="right">登录</NavItem>
    					<NavItem className="right">
    						<i className="iconfont">&#xe636;</i>
    					</NavItem>
    					<SearchWrapper>
    						<NavSearch></NavSearch>
    						<i className="iconfont">&#xe617;</i>
    					</SearchWrapper>
    				</Nav>
    				<Addition>
    					<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
    					<Button className="reg">注册</Button>
    				</Addition>
    			</HeaderWrapper>
    		)
    	}
    }
    export default Header;
    
    //[common/header/style.js]部分代码
    export const SearchWrapper = styled.div`
    	position:relative;
    	float:left;
    	.iconfont{
    		position:absolute;
    		right:5px;
    		bottom:5px;
    		width:30px;
    		line-height:30px;
    		border-radius:15px;
    		text-line:center;
    	}
    `
    ```

    - 在styled-components定义的组件中利用`.iconfont`为内部组件的class为iconfont的组件进行css样式定义
    - 将包裹组件用相对定位，内部组件用绝对定位可以使内部组件重叠，从而将放大镜显示在输入框上

- 搜索框动画效果的实现

  - 引入动画模块：yarn add react-transition-group
  - 利用react-transition-group中的CSSTransition组件进行动画设置
  - 应用实例：

  ```js
  //[common/header/index.js]
  import React , {Component} from 'react';
  import {CSSTransition} from 'react-transition-group';
  import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper} from './style';
  class Header extends Component{
  	constructor(props) {
  	  super(props);
  	  this.handleInputFocus = this.handleInputFocus.bind(this);
  	  this.handleInputBlur = this.handleInputBlur.bind(this);
  	  this.state={
  	  	focused:false,
  	  }
  	}
  	render(){
  		return (
  			<HeaderWrapper>
  				<Logo /> {/*可以写href属性*/}
  				<Nav>
  					<NavItem className="left active">首页</NavItem>
  					<NavItem className="left">下载App</NavItem>
  					<NavItem className="right">登录</NavItem>
  					<NavItem className="right">
  						<i className="iconfont">&#xe636;</i>
  					</NavItem>
  					<SearchWrapper>
  						{/*注意是classNames*/}
  						<CSSTransition
  							in={this.state.focused}
  							timeout={200}
  							classNames="slide"
  							>
  						<NavSearch
  							className={this.state.focused?'focused':''}
  							onFocus={this.handleInputFocus}
  							onBlur={this.handleInputBlur}></NavSearch>
  						</CSSTransition>
  						<i className={this.state.focused?'focused iconfont':'iconfont'}>&#xe617;</i>
  					</SearchWrapper>
  				</Nav>
  				<Addition>
  					<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
  					<Button className="reg">注册</Button>
  				</Addition>
  			</HeaderWrapper>
  		)
  	}
  	handleInputFocus(){
  		this.setState(()=>({
  			focused:true
  		}))
  	}
  	handleInputBlur(){
  		this.setState(()=>({
  			focused:false
  		}))
  	}
  }
  export default Header;
  
  //[common/header/style.js]
  import styled from 'styled-components';
  import logoPic from '../../statics/logo.png';//webpack打包时会将图片打包成logopic
  //创建HeaderWrapper组件（其实就是div），内部写div相关样式
  export const HeaderWrapper = styled.div`
  	position:relative;
  	height:56px;
  	border-bottom:1px solid #f0f0f0;
  `
  export const Logo = styled.a.attrs({
  	href:'/'
  })`
  	position:absolute;
  	top:0;
  	left:0;
  	display:block;
  	width:100px;
  	height:56px;
  	background:url(${logoPic});//多行文本嵌变量
  	background-size:contain;//使背景图片完全覆盖
  `
  export const Nav = styled.div`
  	width:960px;
  	padding-right:70px;
  	box-sizing:border-box;
  	margin:0 auto;
  	height:100%; 
  `
  export const NavItem=styled.div`
  	line-height:56px;
  	padding:0 15px;
  	font-size:17px;
  	color:#333;
  	//&.left表示组件的className是left则具备下述css
  	&.left{
  		float:left;
  	}
  	&.right{
  		float:right;
  		color:#969696;
  	}
  	&.active{
  		color:#ea6f5a;	
  	}
  `
  export const SearchWrapper = styled.div`
  	position:relative;
  	float:left;
  	.slide-enter {
  		transition:all .2s ease-out;
  	}
  	.slide-enter-active {
  		width:240px;
  	}
  	.slide-exit {
  		transition:all .2s ease-out;
  	}
  	.slide-exit-active {
  		width:160px;
  	}
  	.iconfont{
  		position:absolute;
  		right:5px;
  		bottom:5px;
  		width:30px;
  		line-height:30px;
  		border-radius:15px;
  		text-align:center;
  		&.focused{
  			background:#777;
  			color:#fff;
  		}
  	}
  `
  export const NavSearch=styled.input.attrs({
  	placeholder:'搜索'
  })`
  	width:160px;
  	height:38px;
  	padding:0 35px 0 20px;
  	margin-top:9px;
  	margin-left:20px;
  	box-sizing:border-box;
  	border:none；
  	outline:none;
  	border-radius:19px;
  	background:#eee;
  	font-size:14px;
  	color:#666;
  	&::placeholder{//表示组件下的placeholder进行css设置
  		color:#999;
  	}
  	&.focused{
  		width:240px;
  	}
  `
  export const Addition=styled.div`
  	position:absolute;
  	right:0;
  	top:0;
  	height:56px;
  `
  
  export const Button=styled.button`
  	float:right;
  	line-height:38px;
  	border-radius:19px;
  	margin-top:9px;
  	border:1px solid #ec6149;
  	margin-right:20px;
  	padding:0 20px;
  	font-size:14px;
  	&.reg{
  		color:#ec6149;
  	}
  	&.writing{
  		color:#fff;
  		background:#ec6149;
  	}
  `
  ```

- 使用React-Redux进行应用数据的管理

  - 安装redux数据框架:`yarn add redux`
  - 安装react-redux方便我们在react中使用redux:`yarn add react-redux`
  - 具体代码请参见下方

- 使用combineReducers完成对reducer数据的拆分

  - reducer如果存放多个数据，则会导致代码的不可维护，故我们可以创建多个子reducer，并使用redux提供的combinReducers函数将reducer进行整合。若方法返回的对象的键是header，值是子reducer，则取的时候应使用state.header.数据键来取。

- actionCreators与constants的拆分

  - 在store下创建actionCreators.js文件用于创建action
  - 在store下创建创建constants.js用于存放常量
  - 可以在store下书写index.js作为store的出口文件，其他文件引入时可以减少路径的书写
  - 示例代码：

  ```js
  //[App.js]
  import React,{Component} from 'react';
  import Header from './common/header';
  import store from './store'
  import {Provider} from 'react-redux';
  class App extends Component{
  	render(){
  		return(
  			<Provider store={store}>{/*Provider将store的数据提供给内部的Header组件*/}
  				<Header />
  			</Provider>
  		)
  	}
  }
  export default App;
  
  //[style.js]
  import {injectGlobal} from 'styled-components';
  injectGlobal`
  	html, body, div, span, applet, object, iframe,
  	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  	a, abbr, acronym, address, big, cite, code,
  	del, dfn, em, img, ins, kbd, q, s, samp,
  	small, strike, strong, sub, sup, tt, var,
  	b, u, i, center,
  	dl, dt, dd, ol, ul, li,
  	fieldset, form, label, legend,
  	table, caption, tbody, tfoot, thead, tr, th, td,
  	article, aside, canvas, details, embed, 
  	figure, figcaption, footer, header, hgroup, 
  	menu, nav, output, ruby, section, summary,
  	time, mark, audio, video {
  		margin: 0;
  		padding: 0;
  		border: 0;
  		font-size: 100%;
  		font: inherit;
  		vertical-align: baseline;
  	}
  	/* HTML5 display-role reset for older browsers */
  	article, aside, details, figcaption, figure, 
  	footer, header, hgroup, menu, nav, section {
  		display: block;
  	}
  	body {
  		line-height: 1;
  	}
  	ol, ul {
  		list-style: none;
  	}
  	blockquote, q {
  		quotes: none;
  	}
  	blockquote:before, blockquote:after,
  	q:before, q:after {
  		content: '';
  		content: none;
  	}
  	table {
  		border-collapse: collapse;
  		border-spacing: 0;
  	}	
  `
  
  //[store/index.js]
  import {createStore,applyMiddleware, compose} from 'redux';
  import reducer from './reducer';
  const composeEnhancers =
  	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(),
    // other store enhancers if any
  );
  const store = createStore(reducer, enhancer);
  export default store;
  
  //[store/reducer.js]
  import { combineReducers } from 'redux'; //redux的combineReducers函数可以帮我们把小的reducer合并成大的reducer
  import {reducer as headerReducer} from '../common/header/store';//自动找文件夹下的index.js
  //合并方式
  const reducer = combineReducers({
  	header: headerReducer/*取时应是state.header.对应数据*/
  });
  export default reducer;
  
  //[common/header/store/actionCreators.js]
  //帮助我们创建action
  import * as constants from './constants';
  export const searchFocus = () =>({
  	type:constants.SEARCH_FOCUS
  })
  export const searchBlur = () => ({
  	type:constants.SEARCH_BLUR
  })
  
  //[common/header/store/constants.js]
  //常量定义
  export const SEARCH_FOCUS = 'header/SEARCH_FOCUS';
  export const SEARCH_BLUR = 'header/SEARCH_BLUR';
  
  //[common/header/store/reducer.js]
  import * as constants from './constants';
  const defaultState = {
  	focused:false,
  }
  export default (state=defaultState,action) => {
  	if(action.type === constants.SEARCH_FOCUS){
  		const newState = JSON.parse(JSON.stringify(state));
  		newState.focused = true;
  		return newState;
  	}else if(action.type === constants.SEARCH_BLUR){
  		const newState = JSON.parse(JSON.stringify(state));
  		newState.focused = false;
  		return newState;
  	}
  	return state;
  }
  
  //[common/header/store/index.js]
  //作为store的出口文件，引入时可以减少路径的书写。
  import reducer from './reducer';
  import * as actionCreators from './actionCreators';
  import * as constants from './constants';
  export { reducer,actionCreators,constants }
  
  //[common/header/style.js]
  import styled from 'styled-components';
  import logoPic from '../../statics/logo.png';//webpack打包时会将图片打包成logopic
  //创建HeaderWrapper组件（其实就是div），内部写div相关样式
  export const HeaderWrapper = styled.div`
  	position:relative;
  	height:56px;
  	border-bottom:1px solid #f0f0f0;
  `
  export const Logo = styled.a.attrs({
  	href:'/'
  })`
  	position:absolute;
  	top:0;
  	left:0;
  	display:block;
  	width:100px;
  	height:56px;
  	background:url(${logoPic});//多行文本嵌变量
  	background-size:contain;//使背景图片完全覆盖
  `
  export const Nav = styled.div`
  	width:960px;
  	padding-right:70px;
  	box-sizing:border-box;
  	margin:0 auto;
  	height:100%; 
  `
  export const NavItem=styled.div`
  	line-height:56px;
  	padding:0 15px;
  	font-size:17px;
  	color:#333;
  	//&.left表示组件的className是left则具备下述css
  	&.left{
  		float:left;
  	}
  	&.right{
  		float:right;
  		color:#969696;
  	}
  	&.active{
  		color:#ea6f5a;	
  	}
  `
  export const SearchWrapper = styled.div`
  	position:relative;
  	float:left;
  	.iconfont{
  		position:absolute;
  		right:5px;
  		bottom:5px;
  		width:30px;
  		line-height:30px;
  		border-radius:15px;
  		text-align:center;
  		&.focused{
  			background:#777;
  			color:#fff;
  		}
  	}
  `
  export const NavSearch=styled.input.attrs({
  	placeholder:'搜索'
  })`
  	width:160px;
  	height:38px;
  	padding:0 35px 0 20px;
  	margin-top:9px;
  	margin-left:20px;
  	box-sizing:border-box;
  	border:none；
  	outline:none;
  	border-radius:19px;
  	background:#eee;
  	font-size:14px;
  	color:#666;
  	&::placeholder{//表示组件下的placeholder进行css设置
  		color:#999;
  	}
  	&.focused{
  		width:240px;
  	}
  	&.slide-enter {
  		transition:all .5s ease-out;
  	}
  	&.slide-enter-active {
  		width:240px;
  	}
  	&.slide-exit {
  		transition:all .5s ease-out;
  	}
  	&.slide-exit-active {
  		width:160px;
  	}
  `
  export const Addition=styled.div`
  	position:absolute;
  	right:0;
  	top:0;
  	height:56px;
  `
  export const Button=styled.button`
  	float:right;
  	line-height:38px;
  	border-radius:19px;
  	margin-top:9px;
  	border:1px solid #ec6149;
  	margin-right:20px;
  	padding:0 20px;
  	font-size:14px;
  	&.reg{
  		color:#ec6149;
  	}
  	&.writing{
  		color:#fff;
  		background:#ec6149;
  	}
  `
  
  //[common/header/index.js]
  import React from 'react';
  import {connect} from 'react-redux';
  import {CSSTransition} from 'react-transition-group';
  import {actionCreators} from './store';
  import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper} from './style';
  const Header = (props)=>{
  	return (
  		<HeaderWrapper>
  			<Logo /> {/*可以写href属性*/}
  			<Nav>
  				<NavItem className="left active">首页</NavItem>
  				<NavItem className="left">下载App</NavItem>
  				<NavItem className="right">登录</NavItem>
  				<NavItem className="right">
  					<i className="iconfont">&#xe636;</i>
  				</NavItem>
  				<SearchWrapper>
  					{/*注意是classNames*/}
  					<CSSTransition
  						in={props.focused}
  						timeout={200}
  						classNames="slide"
  						>
  					<NavSearch
  						className={props.focused?'focused':''}
  						onFocus={props.handleInputFocus}
  						onBlur={props.handleInputBlur}></NavSearch>
  					</CSSTransition>
  					<i className={props.focused?'focused iconfont':'iconfont'}>&#xe617;</i>
  				</SearchWrapper>
  			</Nav>
  			<Addition>
  				<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
  				<Button className="reg">注册</Button>
  			</Addition>
  		</HeaderWrapper>
  	)
  }
  const mapStateToProps = (state)=>{
  	
  	return{
  		//由于定义时是header:子reducer，故应以state.header.数据键来取
  		focused : state.header.focused
  	}
  }
  const mapDispatchToProps = (dispatch)=>{
  	return{
  		handleInputFocus(){
  			dispatch(actionCreators.searchFocus())
  		},
  		handleInputBlur(){
  			dispatch(actionCreators.searchBlur())
  		}
  	}
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Header);
  ```

- 使用Immutable.js来管理store中的数据

  - immutable.js第三方模块：帮助我们生成immutable对象，此对象时不可改变的。

  - 安装immuntable.js : yarn add immutable

  - 将state变成immutable对象：

    ```js
    //[common/header/store/reducer.js]
    import * as constants from './constants';
    import {fromJS} from 'immutable';//从immutable中引入fromJS
    //将数据转换成immutable对象
    const defaultState = fromJS({
    	focused:false,
    })
    export default (state=defaultState,action) => {
    	if(action.type === constants.SEARCH_FOCUS){
    		//state是immutable对象，set方法会结合之前immutable对象的值和设置的值返回一个全新的对象
    		return state.set('focused',true);
    	}else if(action.type === constants.SEARCH_BLUR){
    		return state.set('focused',false);
    	}
    	return state;
    }
    
    //[common/header/index.js]部分代码
    const mapStateToProps = (state)=>{	
    	return{
    		//由于定义时是header:子reducer，故应以state.header.数据键来取;由于state是immutable对象，故使用get方法取
    		focused : state.header.get('focused')
    	}
    }
    ```

    - 在immutable引入fromJS
    - 将state变成fromJS对象
    - 修改对immutable对象的赋值（采用 对象.set(键，值) 的方式赋值）
    - 调用时采用 对象.get(键) 的方式取值

  - 总结：

    - 使用原始的reducer中state写法需要手动保证state不被修改
    - 引入immutable，将state变成immutable对象
    - 取immutable对象的内容使用get方法
    - 使用immutable对象的set方法对数据进行修改并返回新对象

- 使用redux-immutable统一数据格式

  - 安装redux-immutable:yarn add redux-immutable

  - 具体immutableJS的使用请参见官网

  - 实例代码

    ```js
    //[store/reducer.js]
    import { combineReducers } from 'redux-immutable'; //redux-immutable的combineReducers函数可以帮我们把小的reducer合并成大的reducer
    import {reducer as headerReducer} from '../common/header/store';//自动找文件夹下的index.js
    //合并方式
    //利用redux-immutable的combineReducers生成的数据内容是immutable对象
    const reducer = combineReducers({
    	header: headerReducer/*取时应是state.get('header').对应数据*/
    });
    export default reducer;
    
    //[common/header/index.js]
    const mapStateToProps = (state)=>{
    	return{
    		//由于定义时是header:子reducer，由于state是immutable对象，state.get('header')也是immutable对象，故使用get方法取
    		//focused : state.get('header').get('focused')
    		//利用immutable对象的getIn方法取值等同上述方法
    		focused:state.getIn(['header','focused'])
    	}
    }
    ```

    - 之前由于引入的是redux的combineReducers来创建reducer，故使用时的state是js对象，若想对整合的数据使用immutable对象，则需要引入redux-immutable中的combineReducers
    - 可以利用`focused:state.get('header').get('focused')`取出对应内容，也可利用immutable对象的getIn方法取对应内容如`focused:state.getIn(['header','focused'])`

- 热门搜索样式布局

  - 思路：创建组件叠加显示并封装成函数，传递参数props.focused值，如果是true则return组件；如果是false则return null，调用时使用{方法名(props.focused)}

  - 应用实例

    ```js
    //[common/header/index.js]部分代码
    const getListArea = (show)=>{
    	if(show){
    		return(
    			<SearchInfo>
    				<SearchInfoTitle>
    					热门搜索
    					<SearchInfoSwitch>换一批</SearchInfoSwitch>
    				</SearchInfoTitle>
    				<SearchInfoList>
    					<SearchInfoItem>RTMP推流</SearchInfoItem>
    					<SearchInfoItem>RTMP推流</SearchInfoItem>
    					<SearchInfoItem>RTMP推流</SearchInfoItem>
    					<SearchInfoItem>RTMP推流</SearchInfoItem>
    					<SearchInfoItem>RTMP推流</SearchInfoItem>
    					<SearchInfoItem>RTMP推流</SearchInfoItem>
    				</SearchInfoList>
    			</SearchInfo>
    		);
    	}else{
    		return null;
    	}
    }
    
    //[common/header/style.js]部分代码
    export const SearchInfo=styled.div`
    	position:absolute;
    	left:0;
    	top:56px;
    	width:240px;
    	padding:0 20px;
    	box-shadow:0 0 8px rgba(0,0,0,.2);
    `
    export const SearchInfoTitle=styled.div`
    	margin-top:20px;
    	margin-botton:15px;
    	line-height:20px;
    	font-size:14px;
    	color:#969696;
    `
    export const SearchInfoSwitch=styled.span`
    	float:right;
    	font-size:13px;
    `
    export const SearchInfoList=styled.div`
    	overflow:hidden;
    	padding-top:10px;
    `
    export const SearchInfoItem=styled.a`
    	display:block;
    	float:left;
    	margin-right:10px;
    	margin-bottom:10px;
    	font-size:12px;
    	padding:0 5px;
    	line-height:20px;
    	border:1px solid #ddd;
    	color:#787878;
    	border-radius:3px;
    `
    ```

- Ajax获取推荐数据

  - 安装redux-thunk(redux中间件，使我们在action中写函数):`yarn add redux-thunk`

  - 安装axios(发送ajax请求):`yarn add axios`

  - 借助create-react-app特性：

    - 在public文件夹下建立api包
    - api包下建立headerList.json，并书写对应内容
    - 访问localhost:3000/api/headerList.json即会显现对应内容
    - 原理：create-react-app底层是node服务器，当访问localhost:3000/api/headerList.json，会先到工程目录下查看是否有对应路由；还会到public目录下找对应文件，找到即会输出对应内容；找不到则会找对应api接口，没找到则404
    - 通常开发做法：在public文件夹下建立对应包及文件内容，写入假数据进行自行测试，上线前把假数据的文件夹删除即可，则会自动访问实际接口内容

  - 将异步获取数据的逻辑拆分到actionCreators中，由于使用redux-thunk中间件，则返回的不能是一个对象，而是一个函数

  - 当获取到数据，想要改变store中的数据时，由于使用fromJS将内部的数组会转成immutable对象的数组，需要把改变后的数组也使用fromJS转换成immutable对象的数组

  - 循环获取数据利用map方法return要渲染的组件即可

  - 实例代码:

    ```js
    //在public下创建api/headerList.json用于模拟返回的数据
    {
    	"success":true,
    	"data":["区块链","小程序","三生三世","vue","Rose的肉丝儿","狼医生","毕业","PHP","故事","flutter","理财","美食","投稿","手帐","书法","PPT","穿搭","打碗碗花","简书","姥姥的澎湖湾","设计","创业","交友","籽盐","教育","思维导图","疯哥哥","梅西","时间管理","golang","连载","自律","职场","考研","慢世人","悦欣","一纸vr","spring","eos","足球","程序员","林露含","彩铅","金融","木风杂谈","日更","成长","外婆是方言","docker"]
    }
    
    //[common/header/store/constants.js]
    //常量定义
    export const SEARCH_FOCUS = 'header/SEARCH_FOCUS';
    export const SEARCH_BLUR = 'header/SEARCH_BLUR';
    export const CHANGE_LIST = 'header/CHANGE_LIST';
    
    //[common/header/store/actionCreators.js]
    //帮助我们创建action
    import * as constants from './constants';
    import axios from 'axios';
    import {fromJS} from 'immutable';
    export const searchFocus = () =>({
    	type:constants.SEARCH_FOCUS
    })
    export const searchBlur = () => ({
    	type:constants.SEARCH_BLUR
    })
    export const changeList = (data)=>({
    	type:constants.CHANGE_LIST,
    	data:fromJS(data)//将data变成immutable对象，因为初始的state中的data就是immutable对象
    })
    //用于发送ajax请求异步获取数据
    export const getList = ()=>{
    	return (dispatch)=>{
    		axios.get('/api/headerList.json')
    			.then((res)=>{
    				const data = res.data;
    				dispatch(changeList(data.data));
    			})
    			.catch(()=>{console.log('error')})
    	}
    }
    
    //[common/header/store/reducer.js]
    import * as constants from './constants';
    import {fromJS} from 'immutable';//从immutable中引入fromJS
    //将数据转换成immutable对象
    const defaultState = fromJS({
    	focused:false,
    	list:[]//fromJS会把list变成immutable对象
    })
    export default (state=defaultState,action) => {
    	if(action.type === constants.SEARCH_FOCUS){
    		//state是immutable对象，set方法会结合之前immutable对象的值和设置的值返回一个全新的对象
    		return state.set('focused',true);
    	}else if(action.type === constants.SEARCH_BLUR){
    		return state.set('focused',false);
    	}else if(action.type === constants.CHANGE_LIST){
    		return state.set('list',action.data)
    	}
    	return state;
    }
    
    //[common/header/index.js]
    import React,{Component} from 'react';
    import {connect} from 'react-redux';
    import {CSSTransition} from 'react-transition-group';
    import {actionCreators} from './store';
    import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoList,SearchInfoItem} from './style';
    class Header extends Component{
    	render(){
    		return (
    		<HeaderWrapper>
    			<Logo /> {/*可以写href属性*/}
    			<Nav>
    				<NavItem className="left active">首页</NavItem>
    				<NavItem className="left">下载App</NavItem>
    				<NavItem className="right">登录</NavItem>
    				<NavItem className="right">
    					<i className="iconfont">&#xe636;</i>
    				</NavItem>
    				<SearchWrapper>
    					{/*注意是classNames*/}
    					<CSSTransition
    						in={this.props.focused}
    						timeout={200}
    						classNames="slide"
    						>
    					<NavSearch
    						className={this.props.focused?'focused':''}
    						onFocus={this.props.handleInputFocus}
    						onBlur={this.props.handleInputBlur}></NavSearch>
    					</CSSTransition>
    					<i className={this.props.focused?'focused iconfont':'iconfont'}>&#xe617;</i>
    					{this.getListArea()}
    				</SearchWrapper>
    			</Nav>
    			<Addition>
    				<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
    				<Button className="reg">注册</Button>
    			</Addition>
    		</HeaderWrapper>
    		)
    	}
    
    	getListArea(){
    		if(this.props.focused){
    			return(
    				<SearchInfo>
    					<SearchInfoTitle>
    						热门搜索
    						<SearchInfoSwitch>换一批</SearchInfoSwitch>
    					</SearchInfoTitle>
    					<SearchInfoList>
    						{ 
    							this.props.list.map((item,index)=>{
    								return <SearchInfoItem key={item}>{item}</SearchInfoItem>		
    							}) 
    						}
    					</SearchInfoList>
    				</SearchInfo>
    			);
    		}else{
    			return null;
    		}
    	}
    }
    const mapStateToProps = (state)=>{
    	return{
    		//由于定义时是header:子reducer，由于state是immutable对象，state.get('header')也是immutable对象，故使用get方法取
    		//focused : state.get('header').get('focused')
    		//利用immutable对象的getIn方法取值等同上述方法
    		focused:state.getIn(['header','focused']),
    		list:state.getIn(['header','list'])
    	}
    }
    const mapDispatchToProps = (dispatch)=>{
    	return{
    		handleInputFocus(){
    			dispatch(actionCreators.getList())
    			dispatch(actionCreators.searchFocus())
    		},
    		handleInputBlur(){
    			dispatch(actionCreators.searchBlur())
    		}
    	}
    }
    export default connect(mapStateToProps,mapDispatchToProps)(Header);
    ```

- 热门搜索换页功能实现

  - 在state中添加page和totalPage，用来控制显示的总页数和当前页号，当点击”换一批“后应切换page

  - 思路：

    - state中添加page和totalPage用于控制当前的页数和总页数，从而根据page值确定显示的序号数

      ```js
      //[common/header/store/reducer.js]
      import * as constants from './constants';
      import {fromJS} from 'immutable';//从immutable中引入fromJS
      //将数据转换成immutable对象
      const defaultState = fromJS({
      	focused:false,
      	mouseIn:false,//鼠标是否移入热门显示框中
      	list:[],//fromJS会把list变成immutable对象
      	page:1,
      	totalPage:1
      })
      export default (state=defaultState,action) => {
      	switch(action.type){
      		case constants.SEARCH_FOCUS:
      			//state是immutable对象，set方法会结合之前immutable对象的值和设置的值返回一个全新的对象
      			return state.set('focused',true);
      		case constants.SEARCH_BLUR:
      			return state.set('focused',false);
      		case constants.CHANGE_LIST:
      			//return state.set('list',action.data).set('totalPage',action.totalPage);//如果改变state中多个值则循环调用即可
      			return state.merge({//可以利用merge同时改变多个state数据内容
      				list:action.data,
      				totalPage:action.totalPage
      			})
      		case constants.MOUSE_ENTER:
      			return state.set('mouseIn',true);
      		case constants.MOUSE_LEAVE:
      			return state.set('mouseIn',false);
      		case constants.CHANGE_PAGE:
      			return state.set('page',action.page);
      		default:
      			return state;
      	}
      }
      ```

    - 在index中为SearInfo绑定onMouseEnter和onMouseLeave监听事件，并结合MouseIn值保证当鼠标点击SearchInfo组件时该组件不被关闭（即用focused和mouseIn值同时控制组件的显示）

    - 为”换一批“组件添加点击事件，点击时用page与totalPage进行比较，相同则向action传入1，不同则传入page+1，从而达到切换state中page值的效果，进而在显示时遍历的下标不同，完成点击切换效果

      ```js
      //[common/header/index.js]
      import React,{Component} from 'react';
      import {connect} from 'react-redux';
      import {CSSTransition} from 'react-transition-group';
      import {actionCreators} from './store';
      import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoList,SearchInfoItem} from './style';
      class Header extends Component{
      	render(){
      		const { focused,handleInputFocus,handleInputBlur } = this.props;
      		return (
      		<HeaderWrapper>
      			<Logo /> {/*可以写href属性*/}
      			<Nav>
      				<NavItem className="left active">首页</NavItem>
      				<NavItem className="left">下载App</NavItem>
      				<NavItem className="right">登录</NavItem>
      				<NavItem className="right">
      					<i className="iconfont">&#xe636;</i>
      				</NavItem>
      				<SearchWrapper>
      					{/*注意是classNames*/}
      					<CSSTransition
      						in={focused}
      						timeout={200}
      						classNames="slide"
      						>
      					<NavSearch
      						className={focused?'focused':''}
      						onFocus={handleInputFocus}
      						onBlur={handleInputBlur}></NavSearch>
      					</CSSTransition>
      					<i className={focused?'focused iconfont':'iconfont'}>&#xe617;</i>
      					{this.getListArea()}
      				</SearchWrapper>
      			</Nav>
      			<Addition>
      				<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
      				<Button className="reg">注册</Button>
      			</Addition>
      		</HeaderWrapper>
      		)
      	}
      	getListArea(){
      		const { focused,list,page,totalPage,mouseIn,handleMouseEnter,handleMouseLeave,handleChangePage } = this.props;
      		const newList = list.toJS();//将list从immutable对象转换成js对象
      		const pageList = [];
      		if(newList.length){//第一次渲染时因为没有发送ajax请求而导致newlist为空从而key值为空，项目提示没有key值，故加此判断
      			for(let i=(page-1)*10;i<page*10;i++){
      				pageList.push(
      					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
      				)
      			}
      		}
      		if(focused||mouseIn){
      			return(
      				<SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      					<SearchInfoTitle>
      						热门搜索
      						<SearchInfoSwitch onClick={()=>{handleChangePage(page,totalPage)}}>换一批</SearchInfoSwitch>
      					</SearchInfoTitle>
      					<SearchInfoList>
      						{ pageList }
      					</SearchInfoList>
      				</SearchInfo>
      			);
      		}else{
      			return null;
      		}
      	}
      }
      const mapStateToProps = (state)=>{
      	return{
      		//由于定义时是header:子reducer，由于state是immutable对象，state.get('header')也是immutable对象，故使用get方法取
      		//focused : state.get('header').get('focused')
      		//利用immutable对象的getIn方法取值等同上述方法
      		focused:state.getIn(['header','focused']),
      		list:state.getIn(['header','list']),
      		page:state.getIn(['header','page']),
      		mouseIn:state.getIn(['header','mouseIn']),
      		totalPage:state.getIn(['header','totalPage'])
      	}
      }
      const mapDispatchToProps = (dispatch)=>{
      	return{
      		handleInputFocus(){
      			dispatch(actionCreators.getList())
      			dispatch(actionCreators.searchFocus())
      		},
      		handleInputBlur(){
      			dispatch(actionCreators.searchBlur())
      		},
      		handleMouseEnter(){
      			dispatch(actionCreators.mouseEnter())
      		},
      		handleMouseLeave(){
      			dispatch(actionCreators.mouseLeave())
      		},
      		handleChangePage(page,totalPage){
      			if(page<totalPage){
      				dispatch(actionCreators.changePage(page+1))
      			}else{
      				dispatch(actionCreators.changePage(1))
      			}
      		}
      	}
      }
      export default connect(mapStateToProps,mapDispatchToProps)(Header);
      
      //[common/header/store/actionCreators.js]
      //帮助我们创建action
      import * as constants from './constants';
      import axios from 'axios';
      import {fromJS} from 'immutable';
      const changeList = (data)=>({
      	type:constants.CHANGE_LIST,
      	data:fromJS(data),//将data变成immutable对象，因为初始的state中的data就是immutable对象
      	totalPage:Math.ceil(data.length / 10)//每页显示10个
      
      })
      export const searchFocus = () =>({
      	type:constants.SEARCH_FOCUS
      })
      export const searchBlur = () => ({
      	type:constants.SEARCH_BLUR
      })
      export const mouseEnter=()=>({
      	type:constants.MOUSE_ENTER
      });
      export const mouseLeave=()=>({
      	type:constants.MOUSE_LEAVE
      })
      export const changePage=(page)=>({
      	type:constants.CHANGE_PAGE,
      	page
      })
      export const getList = ()=>{
      	return (dispatch)=>{
      		axios.get('/api/headerList.json')
      			.then((res)=>{
      				const data = res.data;
      				dispatch(changeList(data.data));
      			})
      			.catch(()=>{console.log('error')})
      	}
      }
      ```

- 换页旋转动画效果的实现

  - 用新在iconfont上下载的除iconfont.js外的余下4个文件替换，用新的iconfont.css中的内容替换旧的iconfont.js中部分内容，如下：

    ```js
    import { injectGlobal } from 'styled-components';
    injectGlobal`
    	@font-face {font-family: "iconfont";
    	  src: url('./iconfont.eot?t=1533907370801'); /* IE9*/
    	  src: url('./iconfont.eot?t=1533907370801#iefix') format('embedded-opentype'), /* IE6-IE8 */
    	  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
    	  url('./iconfont.ttf?t=1533907370801') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    	  url('./iconfont.svg?t=1533907370801#iconfont') format('svg'); /* iOS 4.1- */
    	}
    	.iconfont {
    	  font-family:"iconfont" !important;
    	  font-size:16px;
    	  font-style:normal;
    	  -webkit-font-smoothing: antialiased;
    	  -moz-osx-font-smoothing: grayscale;
    	}
    `
    ```

  - 利用css中transition过渡效果为标签添加transition，使标签具备过渡特性；同时给标签添加transform-origin使标签围绕中心点进行旋转。在index.js中设置每次用户点击时修改rotate的值，第一次进入时没有rotate，设定originAngle为0并通过设定+360实现旋转360度，其余点击时由于是字符串，故将其转换给数字，并执行+360的操作。【其中我们利用ref标签获得react组件真实的DOM节点，并赋给this，我们通过DOM节点修改css样式】

  - 示例代码：

    ```js
    //[common/header/index.js]
    import React,{Component} from 'react';
    import {connect} from 'react-redux';
    import {CSSTransition} from 'react-transition-group';
    import {actionCreators} from './store';
    import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoList,SearchInfoItem} from './style';
    
    class Header extends Component{
    	render(){
    		const { focused,handleInputFocus,handleInputBlur } = this.props;
    		return (
    		<HeaderWrapper>
    			<Logo /> {/*可以写href属性*/}
    			<Nav>
    				<NavItem className="left active">首页</NavItem>
    				<NavItem className="left">下载App</NavItem>
    				<NavItem className="right">登录</NavItem>
    				<NavItem className="right">
    					<i className="iconfont">&#xe636;</i>
    				</NavItem>
    				<SearchWrapper>
    					{/*注意是classNames*/}
    					<CSSTransition
    						in={focused}
    						timeout={200}
    						classNames="slide"
    						>
    					<NavSearch
    						className={focused?'focused':''}
    						onFocus={handleInputFocus}
    						onBlur={handleInputBlur}></NavSearch>
    					</CSSTransition>
    					<i className={focused?'focused iconfont zoom':'iconfont zoom'}>&#xe617;</i>
    					{this.getListArea()}
    				</SearchWrapper>
    			</Nav>
    			<Addition>
    				<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
    				<Button className="reg">注册</Button>
    			</Addition>
    		</HeaderWrapper>
    		)
    	}
    
    	getListArea(){
    		const { focused,list,page,totalPage,mouseIn,handleMouseEnter,handleMouseLeave,handleChangePage } = this.props;
    		const newList = list.toJS();//将list从immutable对象转换成js对象
    		const pageList = [];
    		if(newList.length){//第一次渲染时因为没有发送ajax请求而导致newlist为空从而key值为空，项目提示没有key值，故加此判断
    			for(let i=(page-1)*10;i<page*10;i++){
    				pageList.push(
    					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
    				)
    			}
    		}
    		if(focused||mouseIn){
    			return(
    				<SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    					<SearchInfoTitle>
    						热门搜索
    						<SearchInfoSwitch onClick={()=>{handleChangePage(page,totalPage,this.spinIcon)}}>
    							<i ref={(icon)=>{this.spinIcon=icon}} className='iconfont spin'>&#xe851;</i>
    							换一批
    						</SearchInfoSwitch>
    					</SearchInfoTitle>
    					<SearchInfoList>
    						{ pageList }
    					</SearchInfoList>
    				</SearchInfo>
    			);
    		}else{
    			return null;
    		}
    	}
    }
    
    const mapStateToProps = (state)=>{
    	return{
    		//由于定义时是header:子reducer，由于state是immutable对象，state.get('header')也是immutable对象，故使用get方法取
    		//focused : state.get('header').get('focused')
    		//利用immutable对象的getIn方法取值等同上述方法
    		focused:state.getIn(['header','focused']),
    		list:state.getIn(['header','list']),
    		page:state.getIn(['header','page']),
    		mouseIn:state.getIn(['header','mouseIn']),
    		totalPage:state.getIn(['header','totalPage'])
    	}
    }
    
    const mapDispatchToProps = (dispatch)=>{
    	return{
    		handleInputFocus(){
    			dispatch(actionCreators.getList())
    			dispatch(actionCreators.searchFocus())
    		},
    		handleInputBlur(){
    			dispatch(actionCreators.searchBlur())
    		},
    		handleMouseEnter(){
    			dispatch(actionCreators.mouseEnter())
    		},
    		handleMouseLeave(){
    			dispatch(actionCreators.mouseLeave())
    		},
    		handleChangePage(page,totalPage,spin){
    			let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');//将spin的style中的transform中除数字的其他元素替换成空,结果是字符串
    			if(originAngle){
    				originAngle = parseInt(originAngle,10);//将originAngle转换成10进制的数字
    			}else{
    				originAngle = 0;//第一次点击的时候originAngle没有值
    			}
    			spin.style.transform = 'rotate('+(originAngle+360)+'deg)';
    			if(page<totalPage){
    				dispatch(actionCreators.changePage(page+1))
    			}else{
    				dispatch(actionCreators.changePage(1))
    			}
    		}
    	}
    }
    export default connect(mapStateToProps,mapDispatchToProps)(Header);
    
    //[common/header/style.js]
    import styled from 'styled-components';
    import logoPic from '../../statics/logo.png';//webpack打包时会将图片打包成logopic
    
    //创建HeaderWrapper组件（其实就是div），内部写div相关样式
    export const HeaderWrapper = styled.div`
    	position:relative;
    	height:56px;
    	border-bottom:1px solid #f0f0f0;
    `
    export const Logo = styled.a.attrs({
    	href:'/'
    })`
    	position:absolute;
    	top:0;
    	left:0;
    	display:block;
    	width:100px;
    	height:56px;
    	background:url(${logoPic});//多行文本嵌变量
    	background-size:contain;//使背景图片完全覆盖
    `
    export const Nav = styled.div`
    	width:960px;
    	padding-right:70px;
    	box-sizing:border-box;
    	margin:0 auto;
    	height:100%; 
    `
    export const NavItem=styled.div`
    	line-height:56px;
    	padding:0 15px;
    	font-size:17px;
    	color:#333;
    	//&.left表示组件的className是left则具备下述css
    	&.left{
    		float:left;
    	}
    	&.right{
    		float:right;
    		color:#969696;
    	}
    	&.active{
    		color:#ea6f5a;	
    	}
    `
    export const SearchWrapper = styled.div`
    	position:relative;
    	float:left;
    	.zoom{
    		position:absolute;
    		right:5px;
    		bottom:5px;
    		width:30px;
    		line-height:30px;
    		border-radius:15px;
    		text-align:center;
    		&.focused{
    			background:#777;
    			color:#fff;
    		}
    	}
    `
    export const NavSearch=styled.input.attrs({
    	placeholder:'搜索'
    })`
    	width:160px;
    	height:38px;
    	padding:0 35px 0 20px;
    	margin-top:9px;
    	margin-left:20px;
    	box-sizing:border-box;
    	border:none；
    	outline:none;
    	border-radius:19px;
    	background:#eee;
    	font-size:14px;
    	color:#666;
    	&::placeholder{//表示组件下的placeholder进行css设置
    		color:#999;
    	}
    	&.focused{
    		width:240px;
    	}
    	&.slide-enter {
    		transition:all .5s ease-out;
    	}
    	&.slide-enter-active {
    		width:240px;
    	}
    	&.slide-exit {
    		transition:all .5s ease-out;
    	}
    	&.slide-exit-active {
    		width:160px;
    	}
    `
    export const SearchInfo=styled.div`
    	position:absolute;
    	left:0;
    	top:56px;
    	width:240px;
    	padding:0 20px;
    	box-shadow:0 0 8px rgba(0,0,0,.2);
    `
    export const SearchInfoTitle=styled.div`
    	margin-top:20px;
    	margin-botton:15px;
    	line-height:20px;
    	font-size:14px;
    	color:#969696;
    `
    
    export const SearchInfoSwitch=styled.span`
    	float:right;
    	font-size:13px;
    	.spin{
    		display:block;
    		float:left;
    		font-size:12px;
    		margin-right:2px;
    		transition:all .2s ease-in;
    		transform-origin:center center;//以自己的中心为旋转中心
    	}
    `
    export const SearchInfoList=styled.div`
    	overflow:hidden;
    	padding-top:10px;
    `
    
    export const SearchInfoItem=styled.a`
    	display:block;
    	float:left;
    	margin-right:10px;
    	margin-bottom:10px;
    	font-size:12px;
    	padding:0 5px;
    	line-height:20px;
    	border:1px solid #ddd;
    	color:#787878;
    	border-radius:3px;
    `
    export const Addition=styled.div`
    	position:absolute;
    	right:0;
    	top:0;
    	height:56px;
    `
    export const Button=styled.button`
    	float:right;
    	line-height:38px;
    	border-radius:19px;
    	margin-top:9px;
    	border:1px solid #ec6149;
    	margin-right:20px;
    	padding:0 20px;
    	font-size:14px;
    	&.reg{
    		color:#ec6149;
    	}
    	&.writing{
    		color:#fff;
    		background:#ec6149;
    	}
    `
    ```

  - 总结：

    - react是面向数据编程，我们应将目光放在reducer中的数据如何被设计与处理
    - react想改变数据，需要遵循redux单项数据流的流程。派发action给store，store给reducer，reducer返回新的state给store，store修改自身的state，当数据发生变更时，页面就会自动变化。

- 避免无意义的请求发送，提升组件性能

  - 通过list值是否为0确定是否要发送ajax请求

    - 将NavSearch组件的onFocus事件中传递list值给方法
    - 在方法处理中利用`(list.size === 0 ) && dispatch(actionCreators.getList());`判断如果list的size为0则发送ajax请求，如果不为0则发送

  - 为”换一批“组件移动上去时显示小手的图标，添加css样式:`cursor:pointer;`

  - 示例代码：

    ```js
    //[common/header/index.js]
    import React,{Component} from 'react';
    import {connect} from 'react-redux';
    import {CSSTransition} from 'react-transition-group';
    import {actionCreators} from './store';
    import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition,Button,SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoList,SearchInfoItem} from './style';
    
    class Header extends Component{
    	render(){
    		const { focused,list,handleInputFocus,handleInputBlur } = this.props;
    		return (
    		<HeaderWrapper>
    			<Logo /> {/*可以写href属性*/}
    			<Nav>
    				<NavItem className="left active">首页</NavItem>
    				<NavItem className="left">下载App</NavItem>
    				<NavItem className="right">登录</NavItem>
    				<NavItem className="right">
    					<i className="iconfont">&#xe636;</i>
    				</NavItem>
    				<SearchWrapper>
    					{/*注意是classNames*/}
    					<CSSTransition
    						in={focused}
    						timeout={200}
    						classNames="slide"
    						>
    					<NavSearch
    						className={focused?'focused':''}
    						onFocus={()=>{handleInputFocus(list)}}
    						onBlur={handleInputBlur}></NavSearch>
    					</CSSTransition>
    					<i className={focused?'focused iconfont zoom':'iconfont zoom'}>&#xe617;</i>
    					{this.getListArea()}
    				</SearchWrapper>
    			</Nav>
    			<Addition>
    				<Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
    				<Button className="reg">注册</Button>
    			</Addition>
    		</HeaderWrapper>
    		)
    	}
    
    	getListArea(){
    		const { focused,list,page,totalPage,mouseIn,handleMouseEnter,handleMouseLeave,handleChangePage } = this.props;
    		const newList = list.toJS();//将list从immutable对象转换成js对象
    		const pageList = [];
    		if(newList.length){//第一次渲染时因为没有发送ajax请求而导致newlist为空从而key值为空，项目提示没有key值，故加此判断
    			for(let i=(page-1)*10;i<page*10;i++){
    				pageList.push(
    					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
    				)
    			}
    		}
    		if(focused||mouseIn){
    			return(
    				<SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    					<SearchInfoTitle>
    						热门搜索
    						<SearchInfoSwitch onClick={()=>{handleChangePage(page,totalPage,this.spinIcon)}}>
    							<i ref={(icon)=>{this.spinIcon=icon}} className='iconfont spin'>&#xe851;</i>
    							换一批
    						</SearchInfoSwitch>
    					</SearchInfoTitle>
    					<SearchInfoList>
    						{ pageList }
    					</SearchInfoList>
    				</SearchInfo>
    			);
    		}else{
    			return null;
    		}
    	}
    }
    
    const mapStateToProps = (state)=>{
    	return{
    		//由于定义时是header:子reducer，由于state是immutable对象，state.get('header')也是immutable对象，故使用get方法取
    		//focused : state.get('header').get('focused')
    		//利用immutable对象的getIn方法取值等同上述方法
    		focused:state.getIn(['header','focused']),
    		list:state.getIn(['header','list']),
    		page:state.getIn(['header','page']),
    		mouseIn:state.getIn(['header','mouseIn']),
    		totalPage:state.getIn(['header','totalPage'])
    	}
    }
    
    const mapDispatchToProps = (dispatch)=>{
    	return{
    		handleInputFocus(list){
    			(list.size === 0 ) && dispatch(actionCreators.getList());//如果列表有值，则表示已经发送ajax请求，则不重新发；如果没值则重新发
    			dispatch(actionCreators.searchFocus())
    		},
    		handleInputBlur(){
    			dispatch(actionCreators.searchBlur())
    		},
    		handleMouseEnter(){
    			dispatch(actionCreators.mouseEnter())
    		},
    		handleMouseLeave(){
    			dispatch(actionCreators.mouseLeave())
    		},
    		handleChangePage(page,totalPage,spin){
    			let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');//将spin的style中的transform中除数字的其他元素替换成空,结果是字符串
    			if(originAngle){
    				originAngle = parseInt(originAngle,10);//将originAngle转换成10进制的数字
    			}else{
    				originAngle = 0;//第一次点击的时候originAngle没有值
    			}
    			spin.style.transform = 'rotate('+(originAngle+360)+'deg)';
    			if(page<totalPage){
    				dispatch(actionCreators.changePage(page+1))
    			}else{
    				dispatch(actionCreators.changePage(1))
    			}
    		}
    	}
    }
    export default connect(mapStateToProps,mapDispatchToProps)(Header);
    ```

- 什么是路由，如何在React中使用路由功能

  - 路由：根据url的不同，显示不同内容

  - 安装路由：yarn add react-router-dom

  - `<BrowserRouter>`代表路由；`<Route>`代表路由规则

  - 应用实例：

    ```js
    //[App.js]
    import React,{Component} from 'react';
    import Header from './common/header';
    import {BrowserRouter,Route} from 'react-router-dom';
    import store from './store'
    import {Provider} from 'react-redux';
    class App extends Component{
    	render(){
    		return(
    			<Provider store={store}>{/*Provider将store的数据提供给内部的Header组件*/}
    				<div>{/*在外层包div，保证Provicer中的内容都在一个标签中*/}
    					<Header />
    					<BrowserRouter>
    						<div>{/*在外层包div，保证BrowserRouter中的内容都在一个标签中*/}
    							<Route path="/" exact render={()=><div>home</div>}></Route>{/*exact属性如果添加，则表示路径必须完全匹配才显示*/}
    							<Route path="/detail" exact render={()=><div>detail</div>}></Route>
    						</div>
    					</BrowserRouter>
    				</div>
    			</Provider>
    		)
    	}
    }
    export default App;
    ```

    - 需引入react-router-dom中的BrowserRouter和Route，使用时要求Provicer中的内容都被一个标签包裹，故添加div标签；BrowserRouter中的内容都被一个标签包裹，故添加div标签
    - 匹配路径时用BrowserRouter组件包裹Route组件，Route组件根据path写对应的路径，render指定渲染的内容，利用exact标签规定路径必须完全匹配才渲染【如没有添加exact属性，则访问/detail时会匹配显示/和/detail的渲染内容】

- 首页组件的拆分

  - 利用Route组件中`component={Home}`属性引入路由的目标组件为Home

  - 示例代码：

    ```js
    //[App.js]
    import React,{Component} from 'react';
    import Header from './common/header';
    import {BrowserRouter,Route} from 'react-router-dom';
    import store from './store'
    import {Provider} from 'react-redux';
    import Home from './pages/home';
    import Detail from './pages/detail';
    class App extends Component{
    	render(){
    		return(
    			<Provider store={store}>{/*Provider将store的数据提供给内部的Header组件*/}
    				<div>{/*在外层包div，保证Provicer中的内容都在一个标签中*/}
    					<Header />
    					<BrowserRouter>
    						<div>{/*在外层包div，保证BrowserRouter中的内容都在一个标签中*/}
    							<Route path="/" exact component={Home}></Route>{/*exact属性如果添加，则表示路径必须完全匹配才显示*/}
    							<Route path="/detail" exact component={Detail}></Route>
    						</div>
    					</BrowserRouter>
    				</div>
    			</Provider>
    		)
    	}
    }
    export default App;
    
    //[pages/home/index.js]
    import React,{Component} from 'react';
    import { HomeWrapper,HomeLeft,HomeRight } from './style';
    import Topic from './components/Topic'
    import List from './components/List'
    import Recommend from './components/Recommend'
    import Writer from './components/Writer'
    class Home extends Component{
    	render(){
    		return(
    			<HomeWrapper>
    				<HomeLeft>
    					<img className="banner-img" src="https://upload.jianshu.io/admin_banners/web_images/4381/3cdf43257e95766122959099cd4b41b495e6adfc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
    					<Topic/>
    					<List/>
    				</HomeLeft>
    				<HomeRight>
    					<Recommend/>
    					<Writer/>
    				</HomeRight>
    			</HomeWrapper>
    		)
    	}
    }
    export default Home;
    ```

- 首页专题区域布局及reducer的设计

  - 页面想做布局显示列表的内容，列表的内容存在redux的store中。store中有什么数据是由reducer决定的，而reducer又被拆成了很多部分。home页面下的Topic组件的数据应该存在home下的reducer中，让home的reducer来管理home页面上的数据。故在home目录下创建store文件夹，里面有reducer.js，在这里定义了home页面下的默认数据topicList。

    ```js
    //[pages/home/store/reducer.js]
    import {fromJS} from 'immutable';//从immutable中引入fromJS
    //将数据转换成immutable对象
    const defaultState = fromJS({
    	topicList:[
    		{id:1,title:'社会热点',imgUrl:'https://upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64'},
    		{id:2,title:'手绘',imgUrl:'https://upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64'},
    	]
    })
    export default (state=defaultState,action) => {
    	switch(action.type){
    		
    		default:
    			return state;
    	}
    }，
    ```

  - 组件想使用home中的数据，使用react-redux的connect方法让Topic组件和store做连接(connect方法做连接)，连接后就可以在mapStateToProps方法中从store取出我们想要的数据存在props中，使用时在props中取数据即可。

    ```js
    shouye//[common/home/index.js]
    import React,{Component} from 'react';
    import {TopicWrapper,TopicItem} from '../style';
    import {connect} from 'react-redux';
    class Topic extends Component{
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
    	list:state.get('home').get('topicList'),
    })
    const mapDispatchToProps = (dispatch) => ({
    })
    export default connect(mapStateToProps,mapDispatchToProps)(Topic);
    ```

- 首页文章列表制作

  - 原理等同于上方专题区域，在reducer的state中设置articalList数据，利用reeact-redux中的connect使List组件做连接，在mapStateToProps中从store取出想要的数据存在props里，在使用时在props中取数据。

  - 示例代码:

    ```js
    //[pages/home/store/reducer.js]
    import {fromJS} from 'immutable';//从immutable中引入fromJS
    //将数据转换成immutable对象
    const defaultState = fromJS({
    	topicList:[
    		{id:1,title:'社会热点',imgUrl:'https://upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64'},
    		{id:2,title:'手绘',imgUrl:'https://upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64'},
    	],
    	articalList:[
    		{id:1,title:'简书，我又来了O.O',desc:'很久没在简书发画了 也是因为自己的很多琐事缠身，导致不能经常画画 我不太善表达，不会用什么华丽的语言装饰 那就啥也不说了 直接放上一些照片和画吧',imgUrl:'https://upload-images.jianshu.io/upload_images/4194583-e204186ee39aa66b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240'},
    		{id:2,title:'除了奥运会、G20、上合峰会，二三线城市活动营销还有哪些新玩法？',desc:'6月9日，也就是明天，就是上合峰会的正日子了。 上合峰会，全称是上合组织峰会，前身是“上海五国”机制。上海五国”机制发源于上世纪80年代末开始的...',imgUrl:'https://upload-images.jianshu.io/upload_images/1239680-ecc3fa9b09b89a6e.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240'},
    		{id:3,title:'有一种闺蜜，比男友更靠谱',desc:'01 五一期间，我的大学舍友小思飞到南方来找我。 我早早就守在机场出站口，见到她，快步上前就是一个大大的拥抱，两个25岁的熟龄少女激动到尖叫。 ...',imgUrl:'https://upload-images.jianshu.io/upload_images/2090254-98ffe93cdc746519.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240'},
    	]
    })
    export default (state=defaultState,action) => {
    	switch(action.type){	
    		default:
    			return state;
    	}
    }
    
    //[pages/home/components/List.js]
    import React,{Component} from 'react';
    import {connect} from 'react-redux';
    import {ListItem,ListInfo} from '../style';
    class List extends Component{
    	render(){
    		const {list} = this.props;
    		return(
    			<div>
    			{
    				list.map((item,index)=>{
    					return(
    						<ListItem key={item.get('id')}>
    							<img className='pic' src={item.get('imgUrl')} alt={item.title}/>
    							<ListInfo>
    								<h3 className='title'>{item.get('title')}</h3>
    								<p className='desc'>{item.get('desc')}</p>
    							</ListInfo>
    						</ListItem>
    					)
    				})
    			}
    			</div>
    		)
    	}
    }
    const mapStateToProps = (state)=>({
    	list:state.getIn(['home','articalList']),
    })
    const mapDispatchToProps=(dispatch)=>({
    })
    export default connect(mapStateToProps,mapDispatchToProps)(List);
    ```

- 首页异步数据获取

  - 在Home组件的componentDidMount()方法中发送ajax请求，并利用connect方法的mapDispatchToProps函数将请求发送给store

    ```js
    //[pages/home/index.js]
    import React,{Component} from 'react';
    import { connect } from 'react-redux';
    import { HomeWrapper,HomeLeft,HomeRight } from './style';
    import Topic from './components/Topic'
    import List from './components/List'
    import Recommend from './components/Recommend'
    import Writer from './components/Writer'
    import axios from 'axios';
    class Home extends Component{
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
    			</HomeWrapper>
    		)
    	}
    	componentDidMount(){
    		axios.get('/api/home.json').then((res)=>{
    			const result = res.data.data;
    			const action = {
    				type:"change_home_data",
    				topicList:result.topicList,
    				articleList:result.articleList,
    				recommendList:result.recommendList
    			}
    			this.props.changeHomeData(action);
    		})
    	}
    }
    const mapDispathToProps =  (dispatch)=>({
    	changeHomeData(action){
    		dispatch(action);
    	}
    
    })
    export default connect(null,mapDispathToProps)(Home);
    ```

  - 在reducer中接收action并根据action.type确定action从而返回新的state数据。利用state.merge({})可以对state中的多个数据进行处理。

    ```js
    //[pages/home/store/reducer.js]
    import {fromJS} from 'immutable';//从immutable中引入fromJS
    //将数据转换成immutable对象
    const defaultState = fromJS({
    	topicList:[],
    	articleList:[],
    	recommendList:[]
    })
    export default (state=defaultState,action) => {
    	switch(action.type){
    		case "change_home_data":
    			return state.merge({
    				topicList:fromJS(action.topicList),
    				articleList:fromJS(action.articleList),
    				recommendList:fromJS(action.recommendList)
    			})
    		default:
    			return state;
    	}
    }
    ```

- 异步操作代码拆分优化

  - Home作为UI组件最好不要有逻辑处理，故将逻辑处理内容放到actionCreators中创建

  - 由于使用redux-thunk中间件，可以在actionCreator中书写函数并返回，再根据actionTypes中的常量匹配从而到reducer中查找对应的方法进行处理

  - 示例代码

    ```js
    //[pages/home/index.js]
    import React,{Component} from 'react';
    import { connect } from 'react-redux';
    import { HomeWrapper,HomeLeft,HomeRight } from './style';
    import Topic from './components/Topic'
    import List from './components/List'
    import Recommend from './components/Recommend'
    import Writer from './components/Writer'
    import { actionCreators } from './store';
    class Home extends Component{
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
    			</HomeWrapper>
    		)
    	}
    	componentDidMount(){
    		this.props.changeHomeData();//作为UI组件最好不要有逻辑处理，故将逻辑处理内容放到actionCreator中创建
    	}
    }
    const mapDispatchToProps =  (dispatch)=>({
    	changeHomeData(){
    		const action = actionCreators.getHomeInfo();//得到action函数
    		dispatch(action);//派发action函数
    	}
    
    })
    export default connect(null,mapDispatchToProps)(Home);
    
    //[pages/home/store/index.js]
    import reducer from './reducer';
    import * as actionCreators from './actionCreators';
    import * as constants from './constants';
    export {reducer,actionCreators,constants};
    
    //[pages/home/store/constants.js]
    export const CHANGE_HOME_DATA='home/CHANGE_HOME_DATA';
    
    //[pages/home/store/actionCreators.js]
    import axios from 'axios';
    import * as constants from './constants';
    const changeHomeData = (result) =>({
    	type:constants.CHANGE_HOME_DATA,
    	topicList:result.topicList,
    	articleList:result.articleList,
    	recommendList:result.recommendList
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
    
    //[pages/home/store/reducer.js]
    import {fromJS} from 'immutable';//从immutable中引入fromJS
    import * as constants from './constants';
    //将数据转换成immutable对象
    const defaultState = fromJS({
    	topicList:[],
    	articleList:[], 
    	recommendList:[]
    })
    export default (state=defaultState,action) => {
    	switch(action.type){
    		case constants.CHANGE_HOME_DATA:
    			return state.merge({
    				topicList:fromJS(action.topicList),
    				articleList:fromJS(action.articleList),
    				recommendList:fromJS(action.recommendList)
    			})
    		default:
    			return state;
    	}
    }
    ```

- 实现加载更多功能

  - 流程：绑定一个click事件，派发一个action，借助redux-thunk中间件在action中做异步操作发送ajax请求，请求到数据后派发一个同步的action，reducer接收到同步的action去改变它的数据，数据变了，页面就发生变化

  - 示例代码：

    ```js
    //[pages/home/index.js]添加LoadMore组件显示更多(组件代码请参见style.js)，在当前组件中绑定list和page，list用于显示所有的list文章列表，page表示加载的页号
    import React,{Component} from 'react';
    import { connect } from 'react-redux';
    import { ListItem,ListInfo,LoadMore } from '../style';
    import { actionCreators } from '../store';
    class List extends Component{
    	render(){
    		const {list,page,getMoreList} = this.props;
    		return(
    			<div>
    				{
    					list.map((item,index)=>{
    						return(
    							<ListItem key={index}>
    								<img className='pic' src={item.get('imgUrl')} alt={item.title}/>
    								<ListInfo>
    									<h3 className='title'>{item.get('title')}</h3>
    									<p className='desc'>{item.get('desc')}</p>
    								</ListInfo>
    							</ListItem>
    						)
    					})
    				}
    				<LoadMore onClick={()=>getMoreList(page)}>更多文字</LoadMore>
    			</div>
    		)
    	}
    }
    const mapStateToProps = (state)=>({
    	list:state.getIn(['home','articleList']),
    	page:state.getIn(['home','articlePage'])
    })
    const mapDispatchToProps=(dispatch)=>({
    	getMoreList(page){
    		const action = actionCreators.getMoreList(page);
    		dispatch(action);
    	}
    })
    export default connect(mapStateToProps,mapDispatchToProps)(List);
    
    //[pages/home/store/actionCreators.js]
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
    			const action = addHomeList(result,page+1);//添加数据列表信息及下一个页号
    			dispatch(action);
    		})
    	}
    }
    
    //[pages/home/store/reducer.js]
    import {fromJS} from 'immutable';//从immutable中引入fromJS
    import * as constants from './constants';
    //将数据转换成immutable对象
    const defaultState = fromJS({
    	topicList:[],
    	articleList:[], 
    	recommendList:[],
    	articlePage:1
    })
    export default (state=defaultState,action) => {
    	switch(action.type){
    		case constants.CHANGE_HOME_DATA:
    			return state.merge({
    				topicList:fromJS(action.topicList),
    				articleList:fromJS(action.articleList),
    				recommendList:fromJS(action.recommendList)
    			})
    		case constants.ADD_ARTICLE_LIST:
    			return state.merge({
    				articleList:state.get('articleList').concat(action.list),//将新加的数据拼接到之前的数组之后
    				articlePage:action.nextPage//改变页号+1
    			})
    		default:
    			return state;
    	}
    }
    ```

- 返回顶部功能实现

  - 流程：在Home组件中添加BackTop组件，利用store中showScroll的值来决定BackTop是否显示；在componentDidMount生命周期方法中添加对window对象scroll的绑定事件，当页面滑动的高度超过100时派发action将showScroll的值变为true，否则变为false。并在componentWillUnMount生命周期方法中移除该监听事件，以免对其他的组件造成影响；我们对BackTop绑定点击事件，当点击“回到顶部”时`window.scrollTo(0,0)`回到最上方。

  - 示例代码：

    ```js
    //[pages/home/index.js]
    import React,{Component} from 'react';
    import { connect } from 'react-redux';
    import { HomeWrapper,HomeLeft,HomeRight } from './style';
    import Topic from './components/Topic'
    import List from './components/List'
    import Recommend from './components/Recommend'
    import Writer from './components/Writer'
    import { actionCreators } from './store';
    import {BackTop} from './style'
    class Home extends Component{
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
    
    //[pages/home/store/actionCreators.js]
    //添加代码如下
    export const toggleTopShow = (show)=>({
    	type:constants.TOGGLE_SCROLL_SHOW,
    	show
    })
    
    //[pages/home/store/reducer.js]
    //添加代码如下
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
    ```

- 首页性能优化及路由跳转

  - react中的Compont组件和PureComponent组件的区别：

    - PureComponent内在底层实现了shouldComponentUpdate()方法，保证性能优化（如果没有写shouldComponentUpdate方法，当store进行改变时，所有组件全部重新刷新，而不是仅仅当前显示的组件刷新）
    - PureComponent的使用必须使用immutable管理数据

    ```js
    //[pages/home/index.js]
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
    ```

  - 使用a标签和Link组件实现页面跳转的区别：

    - Link跳转属性是to，a标签跳转属性是href
    - a标签跳转的话会又加载一次html；Link属性不会重新加载html，用的是同一个html（单页面应用）
    - Link组件属于react-router-dom
    - Link的使用组件不能在Router外层

    ```js
    //[App.js]Header组件使用Link，将其放置在BrowserRouter中
    import React,{Component} from 'react';
    import Header from './common/header';
    import {BrowserRouter,Route} from 'react-router-dom';
    import store from './store'
    import {Provider} from 'react-redux';
    import Home from './pages/home';
    import Detail from './pages/detail';
    
    class App extends Component{
    	render(){
    		return(
    			<Provider store={store}>{/*Provider将store的数据提供给内部的Header组件*/}
    				<BrowserRouter>
    					<div>{/*在外层包div，保证BrowserRouter中的内容都在一个标签中*/}
    						<Header />
    						<Route path="/" exact component={Home}></Route>{/*exact属性如果添加，则表示路径必须完全匹配才显示*/}
    						<Route path="/detail" exact component={Detail}></Route>
    					</div>
    				</BrowserRouter>
    			</Provider>
    		)
    	}
    }
    export default App;
    ```

- 在不希望内部元素被转译时，应使用`dangerouslySetInnerHTML={{__html:content}}`，此时content的内容即不会被转译直接显示到对应组件中。

  部分相关代码如下：

  ```js
  //[pages/detail/index.js]
  import React,{Component} from 'react';
  import { connect } from 'react-redux';
  import {DetailWrapper,Header,Content} from './style';
  class Detail extends Component{
  	render(){
  		const {title,content} = this.props;
  		return(
  			<DetailWrapper>
  				<Header>{title}</Header>
  				<Content dangerouslySetInnerHTML={{__html:content}}/>{/*dangerouslySetInnerHTML={{__html:content}}可以保证content的内容不被转译*/}
  			</DetailWrapper>
  		)
  	}
  }
  const mapStateToProps = (state)=>({
  	title:state.getIn(['detail','title']),
  	content:state.getIn(['detail','content'])
  })
  const mapDispatchToProps = (dispatch)=>({
  
  })
  export default connect(mapStateToProps,mapDispatchToProps)(Detail);
  
  //[pages/detail/store/reducer.js]
  import {fromJS} from 'immutable';//从immutable中引入fromJS
  import * as constants from './constants';
  //将数据转换成immutable对象
  const defaultState = fromJS({
  	title:'【Dee水彩】画出心中那一抹蓝~',
  	content:'<img src="https://upload-images.jianshu.io/upload_images/10144866-399a0be6d7fed80a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/662"/><p><b>“经常找你讨钱那个吗！”听她这么一说，大家的脑海里浮现出这个大嗓门，大盘脸的胖女人。一头灰白的短发，后颈脖上凸显一个肉包，常穿一件松垮垮的花衬衣，一条黑色打底裤，粗壮的大脚上蹬着一双沾了泥土的黄球鞋。</b></p><p>“经常找你讨钱那个吗！”听她这么一说，大家的脑海里浮现出这个大嗓门，大盘脸的胖女人。一头灰白的短发，后颈脖上凸显一个肉包，常穿一件松垮垮的花衬衣，一条黑色打底裤，粗壮的大脚上蹬着一双沾了泥土的黄球鞋。</p><p>“经常找你讨钱那个吗！”听她这么一说，大家的脑海里浮现出这个大嗓门，大盘脸的胖女人。一头灰白的短发，后颈脖上凸显一个肉包，常穿一件松垮垮的花衬衣，一条黑色打底裤，粗壮的大脚上蹬着一双沾了泥土的黄球鞋。</p><p>“经常找你讨钱那个吗！”听她这么一说，大家的脑海里浮现出这个大嗓门，大盘脸的胖女人。一头灰白的短发，后颈脖上凸显一个肉包，常穿一件松垮垮的花衬衣，一条黑色打底裤，粗壮的大脚上蹬着一双沾了泥土的黄球鞋。</p>'
  })
  export default (state=defaultState,action) => {
  	switch(action.type){
  		default:
  			return state;
  	}
  }
  ```

- 页面路由参数的传递

  - 动态路由获取参数

    - 流程：在App.js的Router中对path路径添加:id；在pages/home/components/List.js中的to路径添加'/'+item.get('id')取到id值并进行路由跳转；在pages/detail/index.js中通过this.props.match.params.id取到对应路径上的id值并传递给actionCreators；actionCreator中发起请求时在路径上带上传递过来的id值即可

    - 示例代码

      ```js
      //App.js
      import React,{Component} from 'react';
      import Header from './common/header';
      import {BrowserRouter,Route} from 'react-router-dom';
      import store from './store'
      import {Provider} from 'react-redux';
      import Home from './pages/home';
      import Detail from './pages/detail';
      class App extends Component{
      	render(){
      		return(
      			<Provider store={store}>{/*Provider将store的数据提供给内部的Header组件*/}
      				<BrowserRouter>
      					<div>{/*在外层包div，保证BrowserRouter中的内容都在一个标签中*/}
      						<Header />
      						<Route path="/" exact component={Home}></Route>{/*exact属性如果添加，则表示路径必须完全匹配才显示*/}
      						<Route path="/detail/:id" exact component={Detail}></Route>
      					</div>
      				</BrowserRouter>
      			</Provider>
      		)
      	}
      }
      export default App;
      
      //[pages/hoem/components/List.js]
      import React,{PureComponent} from 'react';
      import { connect } from 'react-redux';
      import { ListItem,ListInfo,LoadMore } from '../style';
      import { actionCreators } from '../store'
      import { Link} from 'react-router-dom';
      class List extends PureComponent{
      	render(){
      		const {list,page,getMoreList} = this.props;
      		return(
      			<div>
      				{
      					list.map((item,index)=>{
      						return(
      							<Link key={index} to={'/detail/'+item.get('id')}>
      							<ListItem>
      								<img className='pic' src={item.get('imgUrl')} alt={item.title}/>
      								<ListInfo>
      									<h3 className='title'>{item.get('title')}</h3>
      									<p className='desc'>{item.get('desc')}</p>
      								</ListInfo>
      							</ListItem>
      							</Link>
      						)
      					})
      				}
      				<LoadMore onClick={()=>getMoreList(page)}>更多文字</LoadMore>
      			</div>
      		)
      	}
      }
      const mapStateToProps = (state)=>({
      	list:state.getIn(['home','articleList']),
      	page:state.getIn(['home','articlePage'])
      })
      const mapDispatchToProps=(dispatch)=>({
      	getMoreList(page){
      		const action = actionCreators.getMoreList(page);
      		dispatch(action);
      	}
      })
      export default connect(mapStateToProps,mapDispatchToProps)(List);
      
      //[pages/detail/index.js]
      import React,{Component} from 'react';
      import { connect } from 'react-redux';
      import {DetailWrapper,Header,Content} from './style';
      import {actionCreators} from './store';
      class Detail extends Component{
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
      })
      const mapDispatchToProps = (dispatch)=>({
      	getDetail(id){
      		dispatch(actionCreators.getDetail(id));
      	}
      })
      export default connect(mapStateToProps,mapDispatchToProps)(Detail);
      
      //[pages/detail/store/actionCreators.js]
      import axios from 'axios';
      import * as constants from './constants';
      const changeDetail = (title,content)=>({
      	type:constants.CHANGE_DETAIL,
      	title,
      	content
      })
      export const getDetail = (id) => {
      	return (dispatch)=>{
      		axios.get('/api/detail.json?id='+id)
      			.then((res)=>{
      				const result = res.data.data;
      				dispatch(changeDetail(result.title,result.content))
      			});
      	}
      }
      ```

- 登录功能相关知识点

  - styleComponent组件中ref属性取不到对应的Dom，其提供innerRef取其中的DOM

  - 利用Redirect组件实现页面重定向功能

  - 1-2知识点涉及代码：

    ```js
    //[pages/login/index.js]
    import React,{PureComponent} from 'react';
    import { connect } from 'react-redux';
    import {LoginWrapper,LoginBox,Input,Button} from './style';
    import {actionCreators} from './store';
    import {Redirect} from 'react-router-dom';//利用Redirect组件实现页面重定向功能
    class Login extends PureComponent{
    	render(){
    		const {loginStatus} = this.props;
    		if(!loginStatus){
    			return(
    				<LoginWrapper>
    					<LoginBox>
    						<Input placeholder="账号" innerRef={(input)=>{this.account=input}}/>{/*styleComponent组件中ref属性娶不到对应的Dom，其提供innerRef取其中的DOM*/}
    						<Input placeholder="密码" type='password' innerRef={(input)=>{this.password=input}}/>
    						<Button onClick={()=>{this.props.login(this.account,this.password)}}>登录</Button>
    					</LoginBox>
    				</LoginWrapper>
    			)
    		}else{
    			return <Redirect to='/'/>
    		}
    		
    	}
    }
    const mapStateToProps = (state)=>({
    	loginStatus:state.getIn(['login','login'])
    })
    const mapDispatchToProps = (dispatch)=>({
    	login(accountElem,passwordElem){
    		dispatch(actionCreators.login(accountElem.value,passwordElem.value));
    	}
    })
    export default connect(mapStateToProps,mapDispatchToProps)(Login);
    ```

- 异步组件及withRouter路由方法的使用

  - 代码存在问题：

    在控制台NetWork->JS,点击切换页面时，没有加载任何其他js文件，即所有文件对应的js代码都在bundle.js中。

    我们访问首页的时候，会把详情页登录页的代码一起加载，导致加载首页过慢。

  - 异步组件解决上述问题

    - 异步组件底层复杂，在这里不做解释

    - 使用react-loadable组件

      - 安装react-loadable模块:yarn add react-loadable

      - 如在Detail中应用，则在detail文件夹下创建loadable.js文件，里面代码如下

        ```js
        import Loadable from 'react-loadable';//创建loadable组件，组件异步加载的
        import React from 'react';
        
        const LoadableComponent = Loadable({
          loader: () => import('./'),//import表示异步加载当前文件夹下index文件
          loading(){
          	return <div>正在加载</div>
          },//loading表示加载时显示临时的内容，内部返回临时加载要显示的组件
        });
        //导出当前无状态组件
        export default () => <LoadableComponent/>
        ```

      - 在App.js中，我们应加载异步组件，则应访问`pages/detail/loadable.js`加载对应组件，代码如下：

        ```js
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
        ```

      - 注意：如果在App中定义路由的组件是`pages/detail/index.js`返回的组件，则该组件可以直接拿到返回的router信息，即可以得到`this.props.match.params.id`。但是我们现在使用的是loadable.js组件作为路由的组件，即loadable.js组件可以得到router信息，其下属的组件没办法直接获取路由的内容（不是Route路由项直接对应的组件）。

        解决办法：在react-router-dom中引入withRouter方法，使用withRouter方法让Detail获取router中的内容，代码如下：

        ```js
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
        ```

  - 解决后的效果，点击首页的时候加载bundle.js，点击详情页会加载1.chunk.js

    ![](/Users/wangzhe/Practice/慕课React教学图片/异步组件加载network.png)

- 项目上线流程

  - 前端后端商议接口后，前后端解耦各自完成各自内容
  - 前端react项目开发完成后在命令行输入`npm run build`将项目打包，给后台人员
  - 后台人员将前端打包的项目放到对应项目中，部署到服务器即可
  - 注意：如果不是部署在Tomcat根目录下，则需要修改`react项目名\node_modules\react-scripts\config\path.js`中的45行`envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');`将`pathname : '/')`改成`pathname : './')`

- 内容应用总结

  - react基础语法
  - redux数据层框架
  - react-redux如何方便在react中使用redux
  - react-router4.0
  - Immutable.js、styled-components、react-loadable等第三方模块

