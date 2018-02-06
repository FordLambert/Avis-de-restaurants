import React from 'react';

export class SearchInput extends React.Component {

    render() {
        return (
            <input 
                id={this.props.id}
                className={'form-control'} 
                placeholder={this.props.placeholder} 
                type={this.props.type} 
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                defaultValue={this.props.value}
            />
        );
    }
}