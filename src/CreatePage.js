import React, { Component } from 'react'
import request from 'superagent';

const userFromLocalStorageOrWhatever = {
    userId: 1
};

export default class CreatePage extends Component {
    // we need to keep track of brands in state so we can make a dropdown
    state = {
        brands: []
    }

    // on mount, we fetch the brands
    componentDidMount = async () => {
        const response = await request.get('https://infinite-sea-11498.herokuapp.com/brands');

        // then we put those brands in state
        this.setState({ brands: response.body });
    }


    // when the user submits
    handleSubmit = async (e) => {
        // prevent default because it's a form
        e.preventDefault();
    
        // build a new banjo using the form data from the user and their localSotrage token or whatever
        const newBanjo = {
            brand_id: this.state.brandId,
            noise_level: this.state.noiseLevel,
            owner_id: userFromLocalStorageOrWhatever.userId
        };
    
        // shoot that data off to our endpoint using a post request
        const banjo = await request
            .post('https://infinite-sea-11498.herokuapp.com/banjos')
            .send(newBanjo);


        // then redirect the user home so they can see the new banjo.
        this.props.history.push('/');
    }

    // this is just the event handler for our dropdown. we could easily have done this inline.
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
                        {/* we also track the state of the noise level that the user entered  */}
                        <input onChange={e => this.setState({ noiseLevel: e.target.value})} type="number" />
                    </label>

                    <label>
                        Brand (later, let's make this a dropdown)
                        <select onChange={this.handleChange}>
                            {
                            // we use this array of brands to make a dropdown so the user doesn't have to enter an id manually
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
