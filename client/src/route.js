import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory, match } from 'react-router'

//pages
const App= require('./containers/App').default
const Detail= require('./containers/detail').default
const FriendLink = require('./containers/friendlink').default
const Login = require('./containers/login').default
const OldTime = require('./containers/oldtime').default
const Publish = require('./containers/publish').default
const Reg = require('./containers/reg').default




export default {
    path: '/',
  
    component: App
    
    // indexRoute: {
    //   component: require('COMPONENT/Welcome').default
    // },
    
    // childRoutes: [
    //   // 路由按模块组织分离，避免单文件代码量过大
    //   require('./msg').default,
    //   require('./todo').default,
      
    //   // 强制“刷新”页面的 hack
    //   { path: 'redirect', component: require('COMPONENT/Redirect').default },
      
    //   // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
    //   { path: '*', component: require('COMPONENT/404').default }
    // ]
  }