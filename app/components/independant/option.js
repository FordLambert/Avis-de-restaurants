import React from 'react';

export class Option extends React.Component {

    render() {
        return (
            <option>{this.props.optionContent}</option>
        );
    }
}