import React from 'react';

import {ReviewForm} from './review-form';

export class ModalBody extends React.Component {
  
    render() {
        return (
            <div className={'modal-body'}>
                <div className="row justify-content-center">
                    <ReviewForm />
                </div>
            </div>
        );
    }
}