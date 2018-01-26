import React from 'react';

export class RestaurantDetails extends React.Component {

    render() {
        return (	
            <div className={this.props.className}>
                <h2>{this.props.restaurantName}</h2>
                <p>Distance: {this.props.distance}</p>
                <p>{this.props.reviewNumber} avis</p>
            </div>
        );
    }
}