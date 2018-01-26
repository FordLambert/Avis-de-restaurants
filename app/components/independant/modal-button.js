import React from 'react';

export class ModalButton extends React.Component {

    render() {
        return (	
            <a href={this.props.href} id={this.props.id} className={this.props.modalButtonClass}>{this.props.modalButtonText}</a>
        );
    }
}