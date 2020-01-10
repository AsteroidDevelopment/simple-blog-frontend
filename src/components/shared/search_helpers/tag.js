import React from 'react';
import {Link} from 'react-router-dom'
import {handleParameter} from './search_helpers'

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    handleTag = (e) => {
        const value = e.target.getAttribute('data-tag')
        handleParameter(this.props.component, 'tag', value)
    }

    render() {
      const {tags} = this.props
      const hiTag = tags[0] ? tags[0][1] : 1
      
      return <div className="search-helper-box">
        <h3>Tag Cloud</h3>
        {tags.map(tagInfo => 
            <p style={{ 
                fontSize: `${(tagInfo[1] * 150 / hiTag)+50}%`, 
                display: 'inline-block', 
                margin: '0 5px',
                textDecoration: this.props.component.state.loader.tag===tagInfo[0] ? 'underline':"none",
                fontWeight: this.props.component.state.loader.tag===tagInfo[0] ? 'bold':"500"
             }} 
            onClick={this.handleTag} 
            data-tag={tagInfo[0]}> 
                {tagInfo[0]} ({tagInfo[1]})
            </p>)}

        <Link to={`/posts?category=${this.props.component.state.loader.params.get('category')}`} > Clear Tags </Link>
      </div>
    }
}


export default Pagination
