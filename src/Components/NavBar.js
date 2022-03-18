import React from 'react';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('NavBar component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('NavBar component mounted');
    }

    render () {
        return (
            <nav id="navBar">
                <h1 id="title">{this.props.title}</h1>
                <ul id="navList">   
                    <li><a href="/api">API Docs</a></li>
                    <li><span id="loggedInUser">{this.props.username}</span></li>
                    <li><a id="signOutBtn" href="/logout">Sign out</a></li>
                </ul> 
            </nav>       
        );
    }
}

export default NavBar;