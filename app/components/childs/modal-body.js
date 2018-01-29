import React from 'react';

import {ReviewForm} from './../childs/review-form';

export class ModalBody extends React.Component {
  
    render() {
        return (
            <div className={this.props.className}>
                <div className="row justify-content-center">
                    <ReviewForm 
                        formClass={'col-md-10'}
                    />
                </div>
            </div>
        );
    }
}