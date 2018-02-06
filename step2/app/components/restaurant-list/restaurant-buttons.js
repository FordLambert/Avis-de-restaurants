import React from 'react';

import {ModalButton} from './modal-button';
import {SlidingAsideButton} from './sliding-aside-button';

export class RestaurantButtons extends React.Component {

    render() {
        return (
            <div className={'row justify-content-center justify-content-md-end'}>
                <ModalButton />
                <SlidingAsideButton handleClick={this.props.handleClick} />
            </div>
        );
    }
}