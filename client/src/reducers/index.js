import { combineReducers } from 'redux'
import {
    RECEIVE_POSTS
  } from '../actions'


  const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  }, action) => {
    switch (action.type) {

      case RECEIVE_POSTS:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          items: action.posts,
          lastUpdated: action.receivedAt
        }
      default:
        return state
    }
  }
  const postsBySubreddit = (state = { }, action) => {
    switch (action.type) {
 
      case RECEIVE_POSTS:

        return {
          ...state,
          [action.subreddit]: posts(state[action.data], action)
        }
      default:
        return state
    }
  }
  const rootReducer = combineReducers({
    postsBySubreddit
  })
export default rootReducer