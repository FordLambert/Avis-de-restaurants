import React from 'react';

import ModalBody from './ModalBody';

const AddRestaurantPopUp = () => (
    <div id='confirm-addition-popup' className='popup'>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='popUpContainer'>
                    <ModalBody />
                </div>
            </div>
        </div>
    </div>
);

export default AddRestaurantPopUp;