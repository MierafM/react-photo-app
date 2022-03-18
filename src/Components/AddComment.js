import React from 'react';
import {getHeaders} from '../utils';

class AddComment extends React.Component {  
    constructor(props) {
        super(props);
        this.addComment = this.AddComment.bind(this);
        this.fetchPost = this.props.fetchPost.bind(this);
        this.myRef = React.createRef();
        this.submitByBtn = this.submitByBtn.bind(this);
    }
    AddComment() {
        console.log('comment added', this.props)
        var input = document.querySelector('#commentFor'+this.props.postId).value
        console.log(input)
        const postData = {
            "post_id": this.props.postId,
            "text": input
        };
        fetch(`/api/comments`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.fetchPost()
            document.querySelector('#commentFor'+this.props.postId).value = ""
            this.myRef.current.focus();
        })
    }
    
    submitByBtn(e){
        console.log('in here', e)
        if (e.key === 'Enter' || e.key === 'Return') {
          this.addComment()
        }
    }
    




    render () {
        return (
            <div className="userComment">
                <div className="postCommentSec">
                    <i className="far fa-smile"></i>
                    <input className="commentInput"
                            id={'commentFor'+this.props.postId} 
                            aria-label="comment input" 
                            type="text" 
                            placeholder="Add a comment..." 
                            ref={this.myRef}
                            onKeyDown={this.submitByBtn}></input>
                </div>
                <button class="postBtn" onClick={this.addComment}>Post</button>

            </div>
        )     
    }
}

export default AddComment;