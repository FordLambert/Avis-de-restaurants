import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import CloseLink from './ModalCloseLink';

export default class AddRestaurantPopUp extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func
    }

    handleSubmit = (restaurantName) => {
        this.props.handleSubmit(restaurantName);
    }

    render() {
        return (
            <div id='add-restaurant-popup' className='popup'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='popUpContainer'>
                            <ModalHeader />
                            <ModalBody
                                handleSubmit={this.handleSubmit}
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