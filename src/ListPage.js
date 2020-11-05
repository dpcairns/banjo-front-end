import React, { Component } from 'react'
import request from 'superagent';

export default class ListPage extends Component {
    state = {
        banjos: []
    }

    componentDidMount = async () => {
        const response = await request.get('https://infinite-sea-11498.herokuapp.com/banjos');

        this.setState({ banjos: response.body });
    }

    render() {
        return (
            <div>
                {
                    this.state.banjos.length > 0 
                    ? this.state.banjos.map(banjo => <div>
                        <p>{banjo.brand}</p>
                        <p>{banjo.noise_level}</p>
                    </div>)
                    : 'loading'
                }
            </div>
        )
    }
}
