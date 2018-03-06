import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StreetPicture from './StreetPicture';
import GlobalReview from './GlobalReview';
import Address from './Address';

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

    getSplitedAddress(spliter) {
        return this.props.restaurant.vicinity.split(spliter);
    }

    render() {
        return (
            <div className='col-12'>
                <div className='row justify-content-xl-center'>
                    <div className='col-10 col-xl-6 review-title'>
                        <div className='row justify-content-around'>
                            <StreetPicture
                                restaurant={this.props.restaurant}
                            />
                            <div className='col-12 col-sm-4'>
                                <h2>{this.props.restaurant.name}</h2>
                                <Address
                                    street={this.getSplitedAddress(',')[0]}
                                    city={this.getSplitedAddress(',')[1]}
                                />
                            </div>
                            <div className='col-12 col-sm-2'>
                                <div className='row justify-content-center'>
                                    <GlobalReview
                                        averageGrade={this.props.restaurant.rating}
                                        pictureName={this.defineStarColor(this.props.restaurant.rating)}
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