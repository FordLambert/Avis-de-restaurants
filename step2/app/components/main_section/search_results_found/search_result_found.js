import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantButton from './add_restaurant_button';
import Paragraph from './paragraph';

export default class SearchResultFound extends Component {

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
                <Paragraph
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