import React from 'react';
import PropTypes from 'prop-types';

import RestaurantTitle from './restaurant_title';
import Address from './address';
import Paragraph from './paragraph';

const RestaurantDetails = ({restaurantName, address, reviewNumber}) => (
    <div className={'col-12 col-sm-5 col-xl-6 align-self-center'}>
        <RestaurantTitle
            content={restaurantName}
        />
        <Address
            street={address[0]}
            city={address[1]}
        />
        <Paragraph
            spanClass={'themed-colored'}
            dynamicContent={reviewNumber}
            staticContent={' avis'}
        />
    </div>
);

RestaurantDetails.propTypes = {
    restaurantName: PropTypes.string,
    address: PropTypes.array,
    reviewNumber: PropTypes.number
}

export default RestaurantDetails;