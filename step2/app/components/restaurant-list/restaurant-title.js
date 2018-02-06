import React from 'react';

export class RestaurantTitle extends React.Component {

    render() {
        return (	
            <h2>{this.props.restaurantName}</h2>
        );
    }
}