import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMap from './google_map/google_map';
import SearchResultFound from './search_results_found/search_resutl_found';
import RestaurantSection from './restaurant_section/restaurant_section';

export default class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'listComplete': [],
            'listCustom': []
        };
    }

    static propTypes = {
        grade: PropTypes.object,
        order: PropTypes.string
    }

    handleMapLoad = () => {
        fetch('./app/data/restaurant_list.json')
            .then(result => {
                return result.json();
            }).then(data => {
            this.setState({listComplete: data});
            this.setState({listCustom: data});
        });
    }

    componentWillReceiveProps(nextProps) {
        let newList = []

        this.state.listComplete.map(function (restaurant) {
            let overallGrade = this.overallGradeCalculator(restaurant);
            if ((overallGrade >= nextProps.grade.min) && (overallGrade <= nextProps.grade.max)) {
                newList.push(restaurant);
            }
        }.bind(this));

        this.setState({listCustom: newList});
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
            <section className="col-12 col-md-9 col-xl-10 main-section" id="main-section">
                <div className="row">
                    <GoogleMap
                        restaurantList={this.state.listCustom}
                        handleMapLoad={this.handleMapLoad}
                    />
                    <SearchResultFound
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