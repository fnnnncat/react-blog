import { combineReducers } from 'redux'
import {
  RECEIVE_POSTS,
  RECEIVE_POPULAR_POSTS,
  RECEIVE_SEARCH_POSTS,
  RECEIVE_EASSAYS_POSTS,
  RECEIVE_TAG_POSTS
} from '../actions'


const postsBySubreddit = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  popularitems: [],
  tagitems:[],
  eassaysitems:[],
  
}, action) => {
  console.log(action.type)
  switch (action.type) {

    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    case RECEIVE_POPULAR_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        popularitems: action.postsPopular,
        lastUpdated: action.receivedAt
      }
      case RECEIVE_TAG_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        tagitems: action.postsTag,
        lastUpdated: action.receivedAt
      }
      case RECEIVE_EASSAYS_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        eassaysitems: action.postsEassays,
        lastUpdated: action.receivedAt
      }
      case RECEIVE_SEARCH_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.postsSearch,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  postsBySubreddit
})
export default rootReducer