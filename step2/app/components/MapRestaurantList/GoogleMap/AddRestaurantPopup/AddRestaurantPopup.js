import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import CloseLink from './ModalCloseLink';

export default class AddRestaurantPopUp extends Component {

    static propTypes = {
        handleNewNameSubmit: PropTypes.func
    }

    handleNewNameSubmit = (restaurantName) => {
        this.props.handleNewNameSubmit(restaurantName);
    }

    render() {
        return (
            <div id='add-restaurant-popup' className='popup'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='popUpContainer'>
                            <ModalHeader />
                            <ModalBody
                                handleSubmit={this.handleNewNameSubmit}
                            />
                        </div>
                    </div>
                </div>
                <CloseLink
                    className='closePopUpOutSide'
                />
            </div>
        );
    }
}