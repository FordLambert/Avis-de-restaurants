import React from 'react';
import PropTypes from 'prop-types';

const RestaurantTitle = (restaurantName) => (
    <h2>{restaurantName}</h2>
);

RestaurantTitle.propTypes = {
    restaurantName: PropTypes.string
}

export default RestaurantTitle;