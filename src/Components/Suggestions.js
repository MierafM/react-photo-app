import React from 'react';
import Suggestion from './Suggestion';
import { getHeaders } from '../utils';
class Suggestions extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            suggestions: ''
        }
        this.fetchSuggestions = this.fetchSuggestions.bind(this)
        
    }

    componentDidMount() {
        this.fetchSuggestions()
    }

    fetchSuggestions(){
        fetch(`https://photo-app-secured.herokuapp.com/api/suggestions`,{
            headers: getHeaders()
        }).then(res => res.json()).then(data => {
            console.log("suggestions", data)
            this.setState({
                suggestions:data
            })
        });
    }

    render () {
        return (
            <div className="suggestionSection">
                <h2 id="suggestionTitle">Suggestions for you</h2>
                {this.state.suggestions ?
                    <div id="suggestedUsers">
                        {this.state.suggestions.map(sug =>{
                            return(
                                <Suggestion suggestion={sug} status={'Follow'}/>
                            )
                            
                        })}

                    </div>
                    :
                    <div>suggestions</div>

                }
                
            </div>
        )     
    }
}

export default Suggestions;