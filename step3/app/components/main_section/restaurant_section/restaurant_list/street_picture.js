import React from 'react';
import PropTypes from 'prop-types';

const StreetPicture = ({src}) => (
    <div className={'d-none d-sm-block col-4 text-center align-self-center'}>
        <img
            src={src}
            className={'img-fluid'}
            alt={'street-view-picture'}
        />
    </div>
);

StreetPicture.propTypes = {
    src: PropTypes.string
}

export default StreetPicture;