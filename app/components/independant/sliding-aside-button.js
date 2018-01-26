import React from 'react';

export class SlidingAsideButton extends React.Component {

    render() {
        return (	
            <label htmlFor={this.props.slidingId} className={this.props.slidingButtonClass}>{this.props.slidingButtonText}</label>
        );
    }
}