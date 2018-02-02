import React from 'react';

import {Restaurant} from './restaurant';

export class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'restaurantArray': []};
        this.hadBeenMounted = false;
    }

    componentWillMount() {
        document.addEventListener('restaurantList-updated', function(restaurantList) {
            this.setState({restaurantArray: restaurantList.detail});
        }.bind(this));
    }

    componentDidMount() {
        this.hadBeenMounted = true;
    }

    getAverageGrade(restaurant) {
        let reviewNumber = restaurant.ratings.length;
        let total = 0;

        //this.state.restaurantArray.map(function(restaurant){
            restaurant.ratings.map(function(restaurantReview){
                total += restaurantReview.stars;
            });
        //});
        return Math.round((total/reviewNumber) * 100) / 100;
    }

    chooseRenderComponent() {
        if (this.hadBeenMounted) {
            return this.state.restaurantArray.map(function(restaurant, index){
                return <Restaurant key={index}
                        pictureName={'restaurant-1.png'}
                        restaurantName={restaurant.name}
                        distance={'300m'}
                        reviewNumber={'14'}
                        averageGrade={this.getAverageGrade(restaurant)} 
                    />;
                }.bind(this))
        } else {
            return <p>Rien du tout</p>
        }
    }
  
    render() {
        return (
            <div className={'restaurant-list'}>
                <ul className={'row justify-content-center justify-content-lg-start'}>
                    {this.chooseRenderComponent()}
                </ul>
            </div>
        )
    }
}