import React from 'react';

export class Button extends React.Component {

    render() {
        return (
            <button type={this.props.buttonType} className={this.props.buttonClass}>{this.props.buttonContent}</button>
        );
    }
}