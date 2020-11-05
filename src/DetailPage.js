import React, { Component } from 'react'
import { 
    fetchBrands, 
    updateBanjo, 
    fetchBanjo,
 } from './fetches.js';

const userFromLocalStorageOrWhatever = {
    userId: 1
};

export default class CreatePage extends Component {
    // we need to keep track of brands in state so we can make a dropdown
    state = {
        brands: [],
        noiseLevel: 0,
        brandId: 1,
    }

    // on mount, we fetch the brands
    componentDidMount = async () => {
        const brands = await fetchBrands();
        const banjo = await fetchBanjo(this.props.match.params.id);
        // then we put those brands in state
        const brandNameAsAString = banjo.brand;

        const matchingBrand = brands.find((brand) => {
            return brand.name === brandNameAsAString
        });

        this.setState({ 
            brands: brands, 
            // we need to tie our form state to the initial banjo fetch
            brandId: matchingBrand.id,
            noiseLevel: banjo.noise_level
         });
    }


    // when the user submits
    handleSubmit = async (e) => {
        // prevent default because it's a form
        e.preventDefault();
        
        // shoot that data off to our endpoint using a post request
        await updateBanjo(
            this.props.match.params.id,
            {
            // build a new banjo using the form data from the user and their localSotrage token or whatever
                brand_id: this.state.brandId,
                noise_level: this.state.noiseLevel,
                owner_id: userFromLocalStorageOrWhatever.userId
            });

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
                <h2>UPDATE a banjo</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Noise level
                        {/* we also track the state of the noise level that the user entered  */}
                        <input 
                        value={this.state.noiseLevel}
                        onChange={e => this.setState({ noiseLevel: e.target.value})} 
                        type="number" />
                    </label>

                    <label>
                        Brand (later, let's make this a dropdown)
                        {/* somehow, i need this dropdown to initialize to the state of the fetched banjo */}
                        <select onChange={this.handleChange}>
                            {
                            // we use this array of brands to make a dropdown so the user doesn't have to enter an id manually
                             this.state.brands.map(brand => <option 
                            // one of these options needs to have selected === true . . . . which one?
                            // if the brand id of this dropdown option matches the brand id of the banjo in state, then selected === true
                            // the selected BRAND is the only BRAND for which this statement resolves to true:
                             selected={this.state.brandId === brand.id}
                             key={brand.id} 
                             value={brand.id}>
                                 {brand.name}
                             </option>
                             )
                            }
                        </select>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
