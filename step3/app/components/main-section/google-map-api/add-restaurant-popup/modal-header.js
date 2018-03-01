import React from 'react';

import CloseLink from './modal-close-link';
import ModalTitle from './modal-title';

const ModalHeader = () => (
    <div className={'modal-header'}>
        <CloseLink
            className={'close closePopUp'}
            content={'x'}
        />
        <ModalTitle />
    </div>
);

export default ModalHeader;