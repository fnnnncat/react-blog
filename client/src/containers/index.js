import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchPostsIfNeeded} from '../actions'
import { selectSubreddit } from '../actions/index';
const ArticleItem = ({ data }) => {
   
    return <li> 
         <div className = "info" > 题目： { data.title}&nbsp;&nbsp;
            阅读量：{ data.pv } &nbsp;&nbsp;
         </div>  
         <div>
             内容：{data.content}
        </div>
    </li>
}
class Index extends Component{
    static proTypes={
        selectedSubreddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
        console.log(this.props)
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
          const { dispatch, selectedSubreddit } = nextProps
          dispatch(fetchPostsIfNeeded(selectedSubreddit))
          console.log(this.props)
        }
      }
    
    render(){
        let articleTmp = []
        let data=this.props.posts
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            articleTmp.push( <ArticleItem key = { i } data = { data[i] } /> )
        }
    
        return (
            <div>
                <div className="articleMain">
                <ul className = "articleList"> { articleTmp.length ? articleTmp : "暂无搜索结果" } </ul>
                <div className="paging"></div>
                </div>
                <div>
                    <h2>Popular Article</h2>
                </div>
                <div>
                    <h2>Article Of Essays</h2>
                </div>
                <div>
                     <h2>Announcement</h2> 
                </div>
                </div>
        
        )
    }

}
const mapStateToProps = state => {
    const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
  }
export default connect(mapStateToProps)(Index)