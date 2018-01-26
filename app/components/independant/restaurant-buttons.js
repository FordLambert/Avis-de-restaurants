import React from 'react';

import {ModalButton} from './modal-button';
import {SlidingAsideButton} from './sliding-aside-button';

export class RestaurantButtons extends React.Component {

    render() {
        return (
            <div className={this.props.wrapperClass}>
                <ModalButton 
                    href={this.props.modalLink}
                    id={this.props.modalButtonId}
                    modalButtonClass={this.props.modalButtonClass}
                    modalButtonText={this.props.modalButtonText}
                />

                <SlidingAsideButton 
                    slidingId={this.props.slidingId}
                    slidingButtonClass={this.props.slidingButtonClass}
                    slidingButtonText={this.props.slidingButtonText}
                />
            </div>
        );
    }
}