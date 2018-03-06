import React from 'react';
import PropTypes from 'prop-types';

import RestaurantTitle from './RestaurantTitle';
import Address from './Address';

const RestaurantDetails = ({restaurantName, address}) => (
    <div className='col-12 col-sm-5 col-xl-6 align-self-center restaurant-details'>
        <RestaurantTitle
            content={restaurantName}
        />
        <Address
            street={address[0]} 
            city={address[1]}
        />
    </div>
);

RestaurantDetails.propTypes = {
    restaurantName: PropTypes.string,
    address: PropTypes.array
}

export default RestaurantDetails;