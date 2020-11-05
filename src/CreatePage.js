import React, { Component } from 'react'
import request from 'superagent';

const userFromLocalStorageOrWhatever = {
    userId: 1
};

export default class CreatePage extends Component {
    handleSubmit = async (e) => {
        e.preventDefault();
    
        const newBanjo = {
            brand_id: this.state.brandId,
            noise_level: this.state.noiseLevel,
            owner_id: userFromLocalStorageOrWhatever.userId
        };
    
        const banjo = await request
            .post('https://infinite-sea-11498.herokuapp.com/banjos')
            .send(newBanjo);
    
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                create a banjo
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Noise level
                        <input onChange={e => this.setState({ noiseLevel: e.target.value})} type="number" />
                    </label>

                    <label>
                        Brand (later, let's make this a dropdown)
                        <input onChange={e => this.setState({ brandId: e.target.value})} />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
