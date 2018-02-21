import React from 'react';
import PropTypes from 'prop-types';

const RestaurantTitle = ({content}) => (
    <h2>
        {content}
    </h2>
);

RestaurantTitle.propTypes = {
    restaurantName: PropTypes.string
}

export default RestaurantTitle;