import Loadable from 'react-loadable';//创建loadable组件，组件异步加载的
import React from 'react';

const LoadableComponent = Loadable({
  loader: () => import('./'),//import表示异步加载的新的语法
  loading(){
  	return <div>正在加载</div>
  },//loading表示加载时显示临时的内容
});

export default ()=><LoadableComponent/>