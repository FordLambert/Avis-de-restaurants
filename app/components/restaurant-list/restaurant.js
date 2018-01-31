import React from 'react';

import {RestaurantThumbnail} from './restaurant-thumbnail';
import {RestaurantDetails} from './restaurant-details';
import {GlobalReview} from './global-review';
import {RestaurantButtons} from './restaurant-buttons'

export class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            'globalGrade': 4.2,
            'starColor': '',
            'pictureName': 'restaurant-1.png',
            'restaurantName': 'Le Panda d\'Or',
            'distance': '300m',
            'reviewNumber': '14'
        };
    }

    componentWillMount() {
        let grade = this.state.globalGrade;

        if (grade >= 1 && grade <= 2) {
            this.setState({starColor: 'red-star'});
        } else if (grade > 2 && grade < 4) {
            this.setState({starColor: 'orange-star'});
        } else if (grade >= 4 && grade <= 5) {
            this.setState({starColor: 'green-star'});
        } else {
            console.log('Error: rating must be  between 1 and 5')
        }
    }
  
    render() {
        return (
            <li className={'restaurant col-10 col-lg-5 align-self-center'}>
                <div className="row">
                    <RestaurantThumbnail 
                        href={'#'}
                        pictureName={this.state.pictureName}
                    />

                    <RestaurantDetails 
                        restaurantName={this.state.restaurantName}
                        distance={this.state.distance}
                        reviewNumber={this.state.reviewNumber}
                    />

                    <GlobalReview 
                        globalGrade={this.state.globalGrade}
                        pictureName={this.state.starColor} 
                    />
                </div>
                
                <RestaurantButtons />
            </li>
        );
    }
}