import React from 'react';
import {getHeaders} from '../utils';
class Suggestion extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            status: 'Follow',
            followingId: null
        }
        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unFollow = this.unFollow.bind(this);
        // this.fetchPost = this.props.fetchPost.bind(this);
    }

    toggleFollow(ev) {
        
        console.log('toggle follow', this.state.status)
        if (this.state.status == 'Follow'){
            console.log('following ', this.props.suggestion)
            this.follow(this.props.suggestion.id, ev.target)

        }else{
            console.log('unfollowing ', this.props.suggestion)
            this.unFollow(this.props.suggestion.id, ev.target)
        }
    }

    follow(user, element) {
        // console.log('user', user, Number(user))
        const postData = {
            "user_id": user
        }
        fetch(`https://photo-app-secured.herokuapp.com/api/following/`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(res => res.json()).then(data => {
            console.log(data)
            // this.fetchPost()
            this.setState({
                status: 'Unfollow',
                followingId: data.id
            })
            // element.className.replace('follow', 'unfollow')
            // element.setAttribute('aria-checked',"true")
            // element.classList.add('unfollowBtn')
            // element.classList.remove('followBtn')
            // console.log(element)
        })
    }

    unFollow( element) {
        console.log('user unfollowing', this.state.followingId)
        fetch(`https://photo-app-secured.herokuapp.com/api/following/`+this.state.followingId, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                status: 'Follow',
                followingId: null
            })
            // element.className.replace('follow', 'unfollow')
            // element.setAttribute('aria-checked',"False")
            // element.classList.add('unfollowBtn')
            // element.classList.remove('followBtn')
            // console.log(element)
        })
    }




    render () {
        return (
            <div className="suggestedProfile">
                <div className="leftSug">
                    <img className="suggestedProfilePic" src={this.props.suggestion.thumb_url} alt={this.props.suggestion.username}/>
                    <div className="suggestionText">
                        <span className="suggestedName">{this.props.suggestion.username}</span>
                        <span class="sFU">suggested for you</span>
                    </div>
                </div>
                <button className="followBtn Follow" aria-label={this.toggleFollow} aria-checked={this.followingId? true : false} onClick={this.toggleFollow} >{this.state.status}</button>
                
            </div>
        )     
    }
}

export default Suggestion;