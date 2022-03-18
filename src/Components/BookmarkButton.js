import React from 'react';
import {getHeaders} from '../utils';

class BookmarkButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.mark = this.mark.bind(this);
        this.unmark = this.unmark.bind(this);
        this.fetchPost = this.props.fetchPost.bind(this);
        // console.log("props", props)
    }

    toggleBookmark(ev) {
        if (this.props.bookmarkId) {
            console.log('unmark');
            this.unmark();
        } else {
            console.log('mark');
            this.mark();
        }
    }

    mark() {
        fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({ "post_id": this.props.postId})
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.fetchPost()
        })
    }

    unmark() {
        fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${this.props.bookmarkId}`, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.fetchPost()
        })
    }

    render () {
        const bookmarkId = this.props.bookmarkId;
        // console.log('bookmark id', bookmarkId)
        return (
            <button role="switch"
                className="bookmark iconBtn" 
                aria-label="Bookmark Button" 
                aria-checked={bookmarkId ? true : false}
                onClick={this.toggleBookmark}>
                <i className={bookmarkId ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>                        
            </button>
        ) 
    }
}

export default BookmarkButton;