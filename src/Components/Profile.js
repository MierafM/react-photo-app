import React from 'react';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Profile component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Profile component mounted', this.props.currentUser);
    }

    render () {
        return (
            <section id="userSection">
                <img id="userImg" src={this.props.currentUser.thumb_url}/>
                <h2 id="userNameRec">{this.props.currentUser.username}</h2>
            </section>
        );
    }
}

export default Profile;