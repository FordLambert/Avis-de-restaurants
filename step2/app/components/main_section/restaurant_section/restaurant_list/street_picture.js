import React from 'react';
import PropTypes from 'prop-types';

const StreetPicture = ({lat, long}) => (
    <div className={'d-none d-sm-block col-4 text-center align-self-center'}>
        <img
            src={'https://maps.googleapis.com/maps/api/streetview?' +
            'size=300x300' +
            '&location=' + lat + ', ' + long + '&fov=90&heading=235&pitch=10' +
            '&key=AIzaSyDNUGo0UwN5UI3gEYYLRlzdS-Rm53HMr_g'}
            className={'img-fluid'}
            alt={'street-view-picture'}
        />
    </div>
);

StreetPicture.propTypes = {
    lat: PropTypes.string,
    long: PropTypes.string
}

export default StreetPicture;