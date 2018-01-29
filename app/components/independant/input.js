import React from 'react';

export class Input extends React.Component {

    render() {
        return (
            <input 
                className={this.props.inputClass} 
                placeholder={this.props.placeholder} 
                type={this.props.inputType} 
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
            />
        );
    }
}