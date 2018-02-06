import React from 'react';

import {SlidingAsideButton} from './sliding-aside-button';

export class RestaurantButtons extends React.Component {

    render() {
        return (
            <div className={'row justify-content-center justify-content-md-end'}>
                <SlidingAsideButton handleClick={this.props.handleClick} />
            </div>
        );
    }
}