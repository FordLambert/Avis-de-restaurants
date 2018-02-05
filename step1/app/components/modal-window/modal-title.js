import React from 'react';

export class ModalTitle extends React.Component {

  render() {
    return (
        <h2 className={'modal-title'}>{this.props.restaurantName}</h2>
    );
  }
}