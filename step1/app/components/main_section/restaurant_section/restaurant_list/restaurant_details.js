import React from 'react';
import PropTypes from 'prop-types';

import RestaurantTitle from './restaurant_title';
import Address from './address';
import Paragraph from './paragraph';

const RestaurantDetails = ({restaurantName, address, reviewNumber}) => (
    <div className={'col-12 col-sm-4 col-md-5 col-lg-12 col-xl-5 order-lg-1 order-xl-2 align-self-center'}>
        <RestaurantTitle content={restaurantName} />
        <Address street={address[0]} city={address[1]} />
        <Paragraph content={reviewNumber + ' avis'} />
    </div>
);

RestaurantDetails.propTypes = {
    restaurantName: PropTypes.string,
    address: PropTypes.array,
    reviewNumber: PropTypes.number
}

export default RestaurantDetails;