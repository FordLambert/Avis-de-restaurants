import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StreetPicture from './street-picture';
import GlobalReview from './global-review';
import Address from './address';

export default class ReviewTitle extends Component {

    static propTypes = {
        restaurant: PropTypes.object
    }

    defineStarColor(grade) {
        if (grade >= 1 && grade <= 2) {
            return 'red-star';

        } else if (grade > 2 && grade < 4) {
            return 'orange-star';

        } else if (grade >= 4 && grade <= 5) {
            return 'green-star';

        } else {
            return 'unknow-star';
        }
    }

    getAverageGrade(restaurant) {
        const reviewNumber = restaurant.ratings.length;
        if (reviewNumber > 0) {
            let total = 0;

            restaurant.ratings.map(function (restaurantReview) {
                total += restaurantReview.stars;
            });

            return Math.round((total / reviewNumber) * 100) / 100;

        } else {
            return 0;
        }
    }

    getSplitedAddress(spliter) {
        return this.props.restaurant.address.split(spliter);
    }

    render() {
        return (
            <div className={'col-12'}>
                <div className={'row justify-content-xl-center'}>
                    <div className={'col-10 col-xl-6 review-title'}>
                        <div className="row justify-content-around">
                            <StreetPicture
                                address={this.props.restaurant.address}
                            />
                            <div className={'col-12 col-sm-4'}>
                                <h2>{this.props.restaurant.restaurantName}</h2>
                                <Address
                                    street={this.getSplitedAddress(',')[0]}
                                    city={this.getSplitedAddress(',')[1]}
                                />
                            </div>
                            <div className={'col-12 col-sm-2'}>
                                <div className={'row justify-content-center'}>
                                    <GlobalReview
                                        averageGrade={this.getAverageGrade(this.props.restaurant)}
                                        pictureName={this.defineStarColor(this.getAverageGrade(this.props.restaurant))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}