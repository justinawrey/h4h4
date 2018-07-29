import React, { Component } from 'react'
import posed from 'react-pose'
import './App.css'

const jokeApi =
    'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke'

const Joke = ({ setup, punchline }) => (
    <div>
        <h1>{setup}</h1>
        <h1>{punchline}</h1>
    </div>
)

const Animated = posed.div({
    hidden: {
        scale: '0.7',
    },
    visible: {
        scale: '1',
    },
})

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            fetching: 'false',
            setup: '',
            punchline: '',
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    componentDidMount() {
        this.getNewJoke()
    }

    async getNewJoke() {
        this.setState({ fetching: true })
        await this.sleep(1000) // fake sleep
        fetch(jokeApi)
            .then(response => response.json())
            .then(
                ({ setup, punchline }) => {
                    this.setState({
                        setup,
                        punchline,
                        fetching: false,
                    })
                },
                error => {
                    this.setState({
                        error,
                        fetching: false,
                    })
                },
            )
    }

    render() {
        const { error, fetching, setup, punchline } = this.state

        return fetching ? (
            <div className="loader" />
        ) : (
            <Animated
                className="flex-container"
                initialPose="hidden"
                pose="visible"
            >
                {error ? (
                    <h1>An error occurred...</h1>
                ) : (
                    <Joke setup={setup} punchline={punchline} />
                )}
                <button onClick={() => this.getNewJoke()} />
            </Animated>
        )
    }
}

export default App
