import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import CloseLink from './ModalCloseLink';

export default class AddRestaurantPopUp extends Component {

    static propTypes = {
        onNewRestaurantNameSubmit: PropTypes.func
    }

    onNewRestaurantNameSubmit = (restaurantName) => {
        this.props.onNewRestaurantNameSubmit(restaurantName);
    }

    render() {
        return (
            <div id='add-restaurant-popup' className='popup'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='popUpContainer'>
                            <ModalHeader />
                            <ModalBody
                                handleSubmit={this.onNewRestaurantNameSubmit}
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