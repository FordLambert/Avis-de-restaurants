import React from 'react';

export class ReviewInput extends React.Component {

    render() {
        return (
            <input 
                id={this.props.id}
                className={'form-control'} 
                placeholder={this.props.placeholder} 
                type={this.props.type} 
                defaultValue={this.props.defaultValue}
            />
        );
    }
}