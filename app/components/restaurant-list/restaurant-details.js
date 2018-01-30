import React from 'react';

import {RestaurantTitle} from './restaurant-title';
import {Paragraphe} from './paragraphe';

export class RestaurantDetails extends React.Component {

    render() {
        return (	
            <div className={'col-12 col-sm-4 col-md-5 col-lg-12 col-xl-5 order-lg-1 order-xl-2 align-self-center'}>
                <RestaurantTitle restaurantName={this.props.restaurantName} />
                <Paragraphe content={'Distance: ' + this.props.distance} />
                <Paragraphe content={this.props.reviewNumber + ' avis'} />
            </div>
        );
    }
}