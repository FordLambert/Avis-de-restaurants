import React, {Component} from 'react';

import GoogleMap from './google_map/google_map';
//import TestMap from './google_map/test-map';

import SectionBreaker from './section_breaker/section_breaker';
import RestaurantSection from './restaurant_section/restaurant_section';

export default class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'listComplete': [],
            'listCustom': []
        };
    }

    componentWillMount() {
        document.addEventListener('new-list-created', function(restaurantList) {
            this.setState({listComplete: restaurantList.detail});
            this.setState({listCustom: restaurantList.detail});
        }.bind(this));
    }


    shouldComponentUpdate(nextProps) {
        if (this.props.grade != nextProps.props.grade) {
            console.log('Update !');
            let newList = []

            this.state.listComplete.map(function (restaurant) {
                let overallGrade = this.overallGradeCalculator(restaurant);

                if (overallGrade >= this.props.grade) {
                    newList.push(restaurant);
                }
            }.bind(this));

            this.setState({listCustom: newList});
            return true;
        } else {
            return false;
        }
    }

    updateList() {

    }

    overallGradeCalculator(restaurant) {
        let numberOfReviews = restaurant.ratings.length;
        let totalGrade = 0;

        restaurant.ratings.map(function(restaurantReview){
            totalGrade += restaurantReview.stars;
        });

        return Math.round((totalGrade/numberOfReviews) * 100) / 100;
    }

    render() {
        return (
            <section className="col-12 col-md-9 main-section" id="main-section">
                <div className="row">

                    <GoogleMap />

                    <SectionBreaker
                        restaurantNumber={this.state.listCustom.length}
                    />

                    <RestaurantSection
                        restaurantList={this.state.listCustom}
                    />

                </div>
            </section>
        );
    }
}