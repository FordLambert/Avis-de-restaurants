import React from 'react';
import PropTypes from 'prop-types';

const StreetPicture = ({address}) => (
    <div className={'d-none d-sm-block col-3 text-center align-self-center'}>
        <img
            src={'https://maps.googleapis.com/maps/api/streetview?' +
            'size=300x300' +
            '&location=' + address + '&fov=90&heading=235&pitch=10' +
            '&key=AIzaSyDNUGo0UwN5UI3gEYYLRlzdS-Rm53HMr_g'}
            className={'img-fluid'}
            alt={'street-view-picture'}
        />
    </div>
);

StreetPicture.propTypes = {
address: PropTypes.string
}

export default StreetPicture;