
import 'es5-shim';
import 'es5-shim/es5-sham'
import 'es6-shim';
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'

import route from './route'
console.log(route)
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
      < Router  history = { browserHistory }>
         {route}
      </Router> 
  </Provider>,
  document.getElementById('root')
)