import React, { Component } from 'react'
import request from 'superagent';

const userFromLocalStorageOrWhatever = {
    userId: 1
};

export default class CreatePage extends Component {
    state = {
        brands: []
    }

    componentDidMount = async () => {
        const response = await request.get('https://infinite-sea-11498.herokuapp.com/brands');

        this.setState({ brands: response.body });
    }

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

    handleChange = (e) => {
        this.setState({ brandId: e.target.value });
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
                        <select onChange={this.handleChange}>
                            {
                             this.state.brands.map(brand => <option key={brand.id} value={brand.id}>
                                 {brand.name}
                             </option>)
                            }
                        </select>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
