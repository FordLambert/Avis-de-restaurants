import React from 'react';
import PropTypes from 'prop-types';

import Picture from './picture';

const RestaurantThumbnail = ({href, pictureName}) => (
    <div className={'d-none d-sm-block col-sm-4 col-lg-6 col-xl-4 text-center order-lg-2 order-xl-1 align-self-center'}>
        <a href={href}>
            <Picture
                pictureName={pictureName}
                className={'restaurant-picture rounded img-fluid'}
                alt={'restaurant-picture'}
            />
        </a>
    </div>
);

RestaurantThumbnail.propTypes = {
    href: PropTypes.string,
    pictureName: PropTypes.string
}

export default RestaurantThumbnail;