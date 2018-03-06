import React from 'react';

import CloseLink from './ModalCloseLink';
import ModalTitle from './ModalTitle';

const ModalHeader = () => (
    <div className='modal-header'>
        <CloseLink
            className='close closePopUp'
            content='x'
        />
        <ModalTitle />
    </div>
);

export default ModalHeader;