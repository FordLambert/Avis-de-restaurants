import React from 'react';
import PropTypes from 'prop-types';

const Picture = ({pictureName, className, alt}) => (
    <img
        src={'resources/pictures/' + pictureName}
        className={className}
        alt={alt}
    />
);

Picture.propTypes = {
    pictureName: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string
}

export default Picture;