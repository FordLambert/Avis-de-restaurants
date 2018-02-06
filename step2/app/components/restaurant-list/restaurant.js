import React from 'react';

import {RestaurantThumbnail} from './restaurant-thumbnail';
import {RestaurantDetails} from './restaurant-details';
import {GlobalReview} from './global-review';
import {RestaurantButtons} from './restaurant-buttons'

export class Restaurant extends React.Component {

    defineStarColor(grade) {
        if (grade >= 1 && grade <= 2) {
            return 'red-star';
        } else if (grade > 2 && grade < 4) {
            return 'orange-star';
        } else if (grade >= 4 && grade <= 5) {
            return 'green-star';
        } else {
            console.log('Error: rating must be  between 1 and 5')
        }
    }

    handleClick(restaurant) {
        const restaurantClicked = new CustomEvent('restaurant-clicked', {"detail": restaurant});
		document.dispatchEvent(restaurantClicked);
    }
  
    render() {
        return (
            <li className={'restaurant col-10 col-lg-5 align-self-center'}>
                <div className="row">
                    <RestaurantThumbnail 
                        href={'#'}
                        pictureName={this.props.pictureName}
                    />

                    <RestaurantDetails 
                        restaurantName={this.props.restaurantName}
                        distance={this.props.distance}
                        reviewNumber={this.props.reviewNumber}
                    />

                    <GlobalReview 
                        averageGrade={this.props.averageGrade}
                        pictureName={this.defineStarColor(this.props.averageGrade)} 
                    />
                </div>
                
                <RestaurantButtons handleClick={() => this.handleClick(this.props.restaurant)}/>
            </li>
        );
    }
}