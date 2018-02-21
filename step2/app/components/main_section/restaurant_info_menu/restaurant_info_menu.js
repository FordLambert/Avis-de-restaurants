import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantButton from './add_restaurant_button';
import SearchResultFound from './search_result_found';

export default class RestaurantInfoMenu extends Component {

    static propTypes = {
        restaurantNumber: PropTypes.number,
        toggleAddRestaurant: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    toggleAddRestaurant = (status) => {
        this.props.toggleAddRestaurant(status);
    }

    render() {
        return (
            <div className={'search-result-founds col-12 text-center'}>
                <SearchResultFound
                    restaurantNumber={this.props.restaurantNumber}
                />
                <AddRestaurantButton
                    toggleAddRestaurant={this.toggleAddRestaurant}
                    canAddRestaurant={this.props.canAddRestaurant}
                />
            </div>
        );
    }
}