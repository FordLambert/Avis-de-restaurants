import React from 'react';
import PropTypes from 'prop-types';

import RestaurantTitle from './restaurant_title';
import Address from './address';

const RestaurantDetails = ({restaurantName, address}) => (
    <div className={'col-12 col-sm-5 col-xl-6 align-self-center'}>
        <RestaurantTitle
            content={restaurantName}
        />
        <Address
            street={address[0]} city={address[1]}
        />
    </div>
);

RestaurantDetails.propTypes = {
    restaurantName: PropTypes.string,
    address: PropTypes.array
}

export default RestaurantDetails;