import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded, fetchPostsPopularIfNeeded ,fetchPostsSearchIfNeeded,fetchPostsEassaysIfNeeded,fetchPostsTagIfNeeded} from '../actions'
import { selectSubreddit } from '../actions/index'
import Header from '../components/header'
import Footer from '../components/footer'


const ArticleItem = ({ data }) => {

    return <li>
        <div className="info" > 题目： {data.title}&nbsp;&nbsp;
            阅读量：{data.pv} &nbsp;&nbsp;
         </div>
        <div>
            内容：{data.content}
        </div>
    </li>
}
const ArticlePopularItem = ({ data }) => {
    return <li><i className="iconfont">&#xe622;</i>
        <span>
        {data.title}>
        </span>
        <span>
        {data.pv}
        </span>
    </li>
}
const ArticleTagItem = ({ data}) => {
    return <li><i className="iconfont">&#xe622;</i>
        <span>
        {data._id}>
        </span>
        <span>
        {data.num_tutorial}
        </span>
    </li>
}
const ArticleEassaysItem = ({ data }) => {
    return <li><i className="iconfont">&#xe622;</i>
        <span>
        {data._id}>
        </span>
        <span>
        {data.count}
        </span>
    </li>
}
class App extends Component {
    static proTypes = {
        selectedSubreddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        postsPopular: PropTypes.array.postsPopular,
        postsTag:PropTypes.array.postsTag,
        postsEassays:PropTypes.array.postsEassays,
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
        dispatch(fetchPostsPopularIfNeeded(selectedSubreddit))
        dispatch(fetchPostsEassaysIfNeeded(selectedSubreddit))
        dispatch(fetchPostsTagIfNeeded(selectedSubreddit))
        console.log(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = nextProps
            dispatch(fetchPostsIfNeeded(selectedSubreddit))
            dispatch(fetchPostsPopularIfNeeded(selectedSubreddit))
            dispatch(fetchPostsEassaysIfNeeded(selectedSubreddit))
            dispatch(fetchPostsTagIfNeeded(selectedSubreddit))
            
        }
    }

    render() {

        let articleTmp = [],
            popularTmp=[],
            tagTmp=[],
            eassaysTmp=[]
        console.log(this.props) 
        let data = this.props.posts
        let dataPopular = this.props.postsPopular
        for (let i = 0; i < data.length; i++) {
            articleTmp.push(<ArticleItem key={i} data={data[i]} />)
        }
        for (let i = 0; i <this.props.postsPopular.length; i++) {
            popularTmp.push(<ArticlePopularItem key={i} data={this.props.postsPopular[i]} />)
        }
        for (let i = 0; i < this.props.postsTag.length; i++) {
            tagTmp.push(<ArticleTagItem key={i} data={this.props.postsTag[i]} />)
        }
        for (let i = 0; i < this.props.postsEassays.length; i++) {
            eassaysTmp.push(<ArticleEassaysItem key={i} data={this.props.postsEassays[i]} />)
        }

        return (
            <div>
                <Header dispatch={this.props.dispatch}/>
                <div className="articleMain">
                    <ul className="articleList"> {articleTmp.length ? articleTmp : "暂无搜索结果"} </ul>
                    <div className="paging"></div>
                </div>
                <div>
                    <h2>Popular Article</h2>
                    <ul>{popularTmp}</ul>
                </div>
                <div>
                    <h2>Article Of Essays</h2>
                    <ul>{tagTmp}</ul>
                </div>
                <div>
                    <h2>Announcement</h2>
                    <ul>{eassaysTmp}</ul>
                </div>
                <Footer />
            </div>
        )
    }

}
const mapStateToProps = state => {
    const { selectedSubreddit, postsBySubreddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts,
        popularitems: postsPopular,
        tagitems:postsTag,
        eassaysitems:postsEassays

      } = postsBySubreddit|| {
            isFetching: true,
            items: [],
            popularitems: [],
            tagitems:[],
            eassaysitems:[]
        }

    return {
        selectedSubreddit,
        posts,
        postsPopular,
        postsTag,
        postsEassays,
        isFetching,
        lastUpdated
    }
}
export default connect(mapStateToProps)(App)
