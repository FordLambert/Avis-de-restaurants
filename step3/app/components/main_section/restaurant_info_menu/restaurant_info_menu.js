import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantButton from './add_restaurant_button';
import SearchResultFound from './search_result_found';

export default class RestaurantInfoMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'resultsClassName': 'd-block'
        };
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        toggleAddRestaurant: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    toggleAddRestaurant = (status) => {
        if (status) {
            this.setState({
                resultsClassName: 'd-none'
            });
        } else {
            this.setState({
                resultsClassName: 'd-block'
            });
        }
        this.props.toggleAddRestaurant(status);
    }

    /*
    getRestaurantNumber = () => {
        const list = this.props.restaurantList;
        return (list != undefined ? list.length : 0);
    }
    */

    render() {
        return (
            <div className={'search-result-founds col-12 text-center'}>
                <SearchResultFound
                    restaurantNumber={this.props.restaurantList.length}
                    className={this.state.resultsClassName}
                />
                <AddRestaurantButton
                    toggleAddRestaurant={this.toggleAddRestaurant}
                    canAddRestaurant={this.props.canAddRestaurant}
                />
            </div>
        );
    }
}