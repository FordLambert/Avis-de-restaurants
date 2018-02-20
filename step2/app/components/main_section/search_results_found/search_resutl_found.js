import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantButton from './add_restaurant_button';

export default class SearchResultFound extends Component {

    static propTypes = {
        restaurantNumber: PropTypes.number,
        toggleAddRestaurant: PropTypes.func
    }

    toggleAddRestaurant = (status) => {
        this.props.toggleAddRestaurant(status);
    }

    render() {
        return (
            <div className={'search-result-founds col-12 text-center'}>
                <p>{this.props.restaurantNumber}  résultats trouvés</p>
                <AddRestaurantButton
                    toggleAddRestaurant={this.toggleAddRestaurant}
                />
            </div>
        );
    }
}