import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantButton from './add_restaurant_button';
import SearchResultFound from './search_result_found';

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
            <div className={'search-result-founds col-12 text-center'}>
                <SearchResultFound
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