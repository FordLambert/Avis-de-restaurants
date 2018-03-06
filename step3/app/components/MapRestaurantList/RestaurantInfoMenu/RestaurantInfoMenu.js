import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantButton from './AddRestaurantButton';
import SearchResultsFound from './SearchResultsFound';

export default class RestaurantInfoMenu extends Component {

    static propTypes = {
        restaurantList: PropTypes.array,
        toggleAddRestaurant: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    toggleAddRestaurant = (status) => {
        this.props.toggleAddRestaurant(status);
    }

    getResultsClassName() {
        if (this.props.canAddRestaurant) {
            return 'd-none';
        } else {
            return 'd-block';
        }
    }

    render() {
        return (
            <div className='restaurant-infos-menu col-12 text-center'>
                <SearchResultsFound
                    restaurantNumber={this.props.restaurantList.length}
                    className={this.getResultsClassName()}
                />
                <AddRestaurantButton
                    toggleAddRestaurant={this.toggleAddRestaurant}
                    canAddRestaurant={this.props.canAddRestaurant}
                />
            </div>
        );
    }
}