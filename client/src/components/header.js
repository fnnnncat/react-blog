
import React, { Component } from 'react'
import {selectSubreddit,fetchPostsSearchIfNeeded} from '../actions/index'
class InputForm extends Component{
    constructor(props){
        super(props)
    }
    handleSearch(nextProps){
        console.log("into the handleSearch")
        let searchValue= this.refs.searchValue.value
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsSearchIfNeeded(selectedSubreddit,searchValue))
    }
    render(){
        console.log("inpit form render")
        return (
            <div className=''>
                <input className='' ref="searchValue"/>
                <button onClick={this.handleSearch.bind(this)}>search</button>
            </div>
        )
    }
}
class Header extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className="header">
                  <a href = "/">mennu</a> 
                  <a href = "/">fnncat</a> 
                <InputForm dispatch={this.props.dispatch} selectedSubreddit={this.props.selectedSubreddit}/>
            </div>
        )
    }
}
export default Header