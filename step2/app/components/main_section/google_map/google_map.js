import React from 'react';
import PropTypes from 'prop-types';

import Map from './map';
import Pulser from './loading_pulser';

const GoogleMap = ({restaurantList}) => (
    <div id={'map'}>
        <Pulser />
        <Map
            list={restaurantList}
        />
    </div>
);

GoogleMap.propTypes = {
    restaurantList: PropTypes.array
}

export default GoogleMap;