import React, { Component } from 'react';
import './App.css';

const jokeApi = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke";

function Joke(props) {
    return (
        <div>
            <h1>{props.setup}</h1>
            <h1>{props.punchline}</h1>
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            setup: "",
            punchline: "",
        };
    }

    componentDidMount() {
        this.getNewJoke();
    }

    getNewJoke() {
        fetch(jokeApi)
        .then(response => response.json())
        .then(result => {
            this.setState({
                setup: result.setup,
                punchline: result.punchline, 
            });
        },
        error => {
            this.setState({
                error: error,
            });
        });
    }

    render() {

        const {error, setup, punchline} = this.state;

        if (error) {
            return (
                <div className="flex-container">
                    <h1>An error occurred...</h1>
                    <button onClick={() => this.getNewJoke()}>TRY AGAIN!</button>
                </div>
            );
        } else {
            return (
                <div className="flex-container">
                    <Joke setup={setup} punchline={punchline}/>
                    <button onClick={() => this.getNewJoke()}></button>
                </div>
            );
        }
    }
}


export default App;
