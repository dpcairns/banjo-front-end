import React, { Component } from 'react'
import { fetchBanjos } from './fetches.js';

export default class ListPage extends Component {
    state = {
        banjos: []
    }

    componentDidMount = async () => {
        const banjos = await fetchBanjos();
        
        this.setState({ banjos });
    }

    render() {
        const { banjos } = this.state;
        return (
            <div>
                {
                   banjos.length > 0 
                    ? banjos.map(banjo => <div>
                        <p>{banjo.brand}</p>
                        <p>{banjo.noise_level}</p>
                    </div>)
                    : 'loading'
                }
            </div>
        )
    }
}
