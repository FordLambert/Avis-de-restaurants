import React from 'react';
import PropTypes from 'prop-types';

import CloseLink from './modal_close_link';
import ModalTitle from './modal_title';

const ModalHeader = ({restaurantReviewed}) => (
    <div className={'modal-header'}>
        <CloseLink
            className={'close closePopUp'}
            content={'x'}
        />
        <ModalTitle
            restaurantName={restaurantReviewed.restaurantName}
        />
    </div>
);

ModalHeader.protypes = {
    restaurantReviewed: PropTypes.object
}

export default ModalHeader;