import React from 'react';

import CloseLink from './modal_close_link';
import ModalTitle from './modal_title';

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