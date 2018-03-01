import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Restaurant from './restaurant';
import Placeholder from './placeholder';

export default class RestaurantList extends Component {
    static propTypes = {
        restaurantList: PropTypes.array,
        handleOpenReview: PropTypes.func,
        handleAddReview: PropTypes.func
    }

    chooseRenderComponent(restaurantList) {
        if (restaurantList.length > 0) {

            return restaurantList.map((restaurant, index) => {
                return <Restaurant
                    key={index}
                    id={index}
                    handleOpenReview={this.handleOpenReview}
                    handleAddReview={this.handleAddReview}
                    restaurant={restaurant}
                />;
            })

        } else {
            return <Placeholder />
        }
    }

    handleOpenReview = (restaurant) => {
        this.props.handleOpenReview(restaurant);
    }

    handleAddReview = (restaurant) => {
        this.props.handleAddReview(restaurant);
    }

    render() {
        return (
            <div className={'restaurant-list'}>
                <ul className={'row justify-content-center justify-content-lg-start'}>
                    {this.chooseRenderComponent(this.props.restaurantList)}
                </ul>
            </div>
        )
    }
}