export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const RECEIVE_POPULAR_POSTS='RECEIVE_POPULAR_POSTS'
export const RECEIVE_SEARCH_POSTS='RECEIVE_POPULAR_POSTS'
export const RECEIVE_EASSAYS_POSTS='RECEIVE_EASSAYS_POSTS'
export const RECEIVE_TAG_POSTS="RESEIVE_TAG_POSTS"

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json,
  receivedAt: Date.now()
})
export const receivePopularPosts = (subreddit, json) => ({
  type: RECEIVE_POPULAR_POSTS,
  subreddit,
  postsPopular: json,
  receivedAt: Date.now()
})
export const receiveEassaysPosts = (subreddit, json) => ({
  type: RECEIVE_EASSAYS_POSTS,
  subreddit,
  postsEassays: json,
  receivedAt: Date.now()
})
export const receiveTagPosts = (subreddit, json) => ({
  type: RECEIVE_TAG_POSTS,
  subreddit,
  postsTag: json,
  receivedAt: Date.now()
})
const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`http://localhost:3333/articleList`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}
const fetchPostsPopular = subreddit => dispatch => {
  console.log("ssss")
  dispatch(requestPosts(subreddit))
  return fetch(`http://localhost:3333/articlePopular`)
    .then(response => response.json())
    .then(json => {
      dispatch(receivePopularPosts(subreddit, json))
      console.log('into the action requirePostPopualr')
    })
}
const fetchPostsEassays = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`http://localhost:3333/artcileEssays`)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveEassaysPosts(subreddit, json))
      console.log('into the action requirePostPopualr')
    })
}
const fetchPostsTag = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`http://localhost:3333/artcileHot`)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveTagPosts(subreddit, json))
      console.log('into the action requirePostPopualr')
    })
}
const fetchPostsSearch=(subreddit,searchParam)=>dispatch=>{
  dispatch(requestPosts(subreddit))
  return fetch('http://localhost:3333/search?searchParam='+searchParam)
        .then(response=>response.json())
        .then(json=>{dispatch(receivePosts(subreddit,json))
        console.log(json)
        })      
}
const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
export const fetchPostsPopularIfNeeded = (subreddit) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPostsPopular(subreddit))
    
  }
}
export const fetchPostsEassaysIfNeeded = (subreddit) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPostsEassays(subreddit))
  }
}
export const fetchPostsTagIfNeeded = (subreddit) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPostsTag(subreddit))
  }
}

export const fetchPostsSearchIfNeeded = (subreddit,searchParam) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPostsSearch(subreddit,searchParam))
  }
}