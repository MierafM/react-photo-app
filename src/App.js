import React from 'react';
import NavBar from './Components/NavBar';
import Profile from './Components/Profile';
import Stories from './Components/Stories';
import Suggestions from './Components/Suggestions';
import Posts from './Components/Posts';
import { getHeaders } from './utils';
class App extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
        this.fetchProfile = this.fetchProfile.bind(this)
    }
   
    componentDidMount() {
        this.fetchProfile();
    }
    fetchProfile(){
        fetch(`/api/profile/`,{
            headers: getHeaders()
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                user:data
            })
        });
    }

    render () {
        console.log(this.state)
        return (
            <div>
                
                <NavBar title="Photo App" username={this.state.user.username} />

                

                <main id="mainContent">
                    <section id="following">
                        <Stories />
                        <Posts />
                    </section>
                    <aside id="recPanel">
                        {this.state.user ? <Profile currentUser={this.state.user}/> : <div></div>}
                        <Suggestions />
                </aside>
                    
                </main>
                
            </div>
        );
    }
}

export default App;