import React from 'react';
import { getHeaders } from '../utils';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.postData
        }
        this.fetchPost = this.fetchPost.bind(this)
    }
    fetchPost(){
        fetch(`https://photo-app-secured.herokuapp.com/api/posts/`+Number(this.state.post.id),{
            headers: getHeaders()
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                post:data
            })
        });
    }
    
    
    render (){
        
        const post = this.state.post;
        console.log('post', post)
        if (!post) {
            return (
                <div></div>  
            );
        }
        let commentSec = <section class='commentsSec'></section>
        if (post.comments.length > 1){
            commentSec =  <section class='commentsSec'>
                <span class='commentsLen'>view all {post.comments.length} comments</span>
                <section class='comment'>
                    <span class='commenterName'>{ post.comments[post.comments.length-1].user.username}</span>
                    <span class='commentText'>{ post.comments[post.comments.length-1].text}</span>
                </section>
                </section>

        }
        else if (post.comments.length == 1){
            commentSec =  <section class='commentsSec'>
                <span class='commenterName'>{post.comments[post.comments.length-1].user.username}</span>
                <span class='commentText'>{post.comments[post.comments.length-1].text}</span>
                </section>

        }


        return (
            <section className="card">
                <div className="cardHeader">
                    <h3 className="cardName">{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img id="cardImg"
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username }  />
                
                <div className="cardbody">
                    <div className="interactionLinks">
                        <div className="mainIcons">
                            <LikeButton
                                postId={post.id}
                                likeId={post.current_user_like_id}
                                fetchPost={this.fetchPost}/>
                            <button className="iconBtn">
                                <i className="far fa-comment"></i>
                            </button>
                            <button className="iconBtn">
                                <i className="far fa-paper-plane"></i>
                            </button>
                        </div>
                        
                        <BookmarkButton
                            postId={post.id}
                            bookmarkId={post.current_user_bookmark_id}
                            fetchPost={this.fetchPost}/>
                    </div>
                    <div className="likeSec101">
                        <span className="likeText"><b>{(post.likes.length==1)? post.likes.length+" like" : post.likes.length+" likes"}</b></span>
                    </div>
                    <div className="caption">
                        <span className="createrName"> creater name</span>
                        <span className="picCaption">{ post.caption }</span>
                        <button className="moreBtn">more</button>
                    </div>
                    <div className="commentDate">
                        <span className="commentDateText">{post.display_time}</span>
                    </div>
                    {commentSec}
                    <AddComment postId={post.id} fetchPost={this.fetchPost}/>
                    
                </div>
            </section> 
        );     
    }
}

export default Post;