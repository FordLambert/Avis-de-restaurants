import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Restaurant from './restaurant';
import Placeholder from './placeholder';

export default class RestaurantList extends Component {
    static propTypes = {
        restaurantList: PropTypes.array
    }

    chooseRenderComponent(restaurantList) {
        if (restaurantList != undefined) {
            return restaurantList.map(function(restaurant, index){
                return <Restaurant
                    key={index}
                    id={index}
                    handleOpenReview={this.handleOpenReview}
                    handleAddReview={this.handleAddReview}
                    restaurant={restaurant}
                />;
            }.bind(this))
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