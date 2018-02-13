import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Restaurant from './restaurant';

export default class RestaurantList extends Component {
    static propTypes = {
        restaurantList: PropTypes.array
    }

    chooseRenderComponent(restaurantList) {
        if (restaurantList != undefined) {
            return restaurantList.map(function(restaurant, index){
                return <Restaurant
                    key={index}
                    handleOpenReview={this.handleOpenReview}
                    restaurant={restaurant}
                />;
            }.bind(this))
        } else {
            return <p>Rien du tout</p>
        }
    }

    handleOpenReview = (restaurant) => {
        this.props.handleOpenReview(restaurant);
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