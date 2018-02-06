import React from 'react';

import {CloseLink} from './modal-close-link';
import {ModalTitle} from './modal-title';

export class ModalHeader extends React.Component {
  
    render() {
        return (
            <div className={'modal-header'}>
                <CloseLink 
                    className={'close closePopUp'}
                    linkContent={'x'}
                />

                <ModalTitle 
                    restaurantName={'Restaurant exemple'}
                />
            </div>
        );
    }
}