import React from 'react';
import PropTypes from 'prop-types';

import CloseLink from './modal-close-link';
import ModalTitle from './modal-title';

const ModalHeader = ({restaurantReviewed}) => (
    <div className={'modal-header'}>
        <CloseLink
            className={'close closePopUp'}
            content={'x'}
        />
        <ModalTitle
            restaurantName={restaurantReviewed.name}
        />
    </div>
);

ModalHeader.protypes = {
    restaurantReviewed: PropTypes.object
}

export default ModalHeader;