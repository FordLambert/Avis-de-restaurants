import React from 'react';

import {Restaurant} from './restaurant';

export class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'restaurantArray': []};
    }

    addRestaurant() {
        for (let i = 0; i < 6; i++) {
            let newRestaurant = <Restaurant />

            this.state.restaurantArray.push(newRestaurant);
        }
    }
  
    render() {
        this.addRestaurant();

        return (
            <div className={'restaurant-list'}>
                <ul className={'row justify-content-center justify-content-lg-around'}>
                    {this.state.restaurantArray}
                </ul>
            </div>
        );
    }
}