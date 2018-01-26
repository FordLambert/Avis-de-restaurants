import React from 'react';
import ReactDOM from 'react-dom';

import {Restaurant} from './../childs/restaurant';

export class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'restaurantArray': []};
    }

    addRestaurant() {
        for (let i = 0; i < 4; i++) {
            let newRestaurant = <Restaurant restaurantClass={'restaurant col-10 col-lg-5  align-self-center'} />

            this.state.restaurantArray.push(newRestaurant);
        }
    }
  
    render() {
        this.addRestaurant();

        return (
            <ul className={'row justify-content-center justify-content-lg-around'}>
                {this.state.restaurantArray}
            </ul>
        );
    }
}


ReactDOM.render(
    <RestaurantList />,
    document.getElementById('restaurant-list')
);