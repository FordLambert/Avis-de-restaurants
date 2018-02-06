import React from 'react';

import {ModalHeader} from './modal-header';
import {ModalBody} from './modal-body';
import {CloseLink} from './modal-close-link';

export class ModalWindow extends React.Component {

    render() {
        return (
            <div id={'popUp'} className={'popup'}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="popUpContainer">
                            <ModalHeader />
                            <ModalBody />
                        </div>

                    </div>
                </div>

                <CloseLink
                    className={'closePopUpOutSide'}
                />
            </div>
        );
    }
}