import React from 'react';
import PropTypes from 'prop-types';

const StreetPicture = ({lat, long, className, address}) => (
    <div className={'d-none d-sm-block col-sm-3 col-md-4 text-center align-self-center'}>
        <img
            src={'https://maps.googleapis.com/maps/api/streetview?' +
            'size=150x150' +
            '&location=' + address + '&fov=90&heading=235&pitch=10' +
            '&key=AIzaSyDNUGo0UwN5UI3gEYYLRlzdS-Rm53HMr_g'}
            className={className}
            alt={'street-view-picture'}
        />
    </div>
);

StreetPicture.propTypes = {
    address: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string
}

export default StreetPicture;