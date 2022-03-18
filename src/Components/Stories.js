import React from 'react';
import { getHeaders } from '../utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            stories: ''
        }
        this.fetchStories = this.fetchStories.bind(this)
    }

    componentDidMount() {
        this.fetchStories();
    }
    fetchStories(){
        fetch(`https://photo-app-secured.herokuapp.com/api/stories`,{
            headers: getHeaders()
        }).then(res => res.json()).then(data => {
            console.log("stories: ", data)
            this.setState({
                stories:data
            })
        });
    }

   
    render () {
        return (
            <header id="storiesPanel">
                {this.state.stories ?
                    this.state.stories.map(story => {
                        return(
                            <section className="story">
                                <img className="storyimg" src={story.user.thumb_url}/>
                                <span className="storyName">{story.user.username}</span>
                            </section>
                        )
                    })
                :
                <div></div>}
                
            </header>  
        );
    }
}

export default Stories;