import React from 'react';
import PropTypes from 'prop-types';

import RestaurantTitle from './restaurant_title';
import Paragraphe from './paragraphe';

const RestaurantDetails = ({restaurantName, distance, reviewNumber}) => (
    <div className={'col-12 col-sm-4 col-md-5 col-lg-12 col-xl-5 order-lg-1 order-xl-2 align-self-center'}>
        <RestaurantTitle restaurantName={restaurantName} />
        <Paragraphe content={'Distance: ' + distance} />
        <Paragraphe content={reviewNumber + ' avis'} />
    </div>
);

RestaurantDetails.propTypes = {
    restaurantName: PropTypes.string,
    distance: PropTypes.number,
    reviewNumber: PropTypes.number
}

export default RestaurantDetails;