import React from 'react';

export class Label extends React.Component {

    render() {
        return (
            <label htmlFor={this.props.htmlFor}>{this.props.labelContent}</label>
        );
    }
}