import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import CloseLink from './ModalCloseLink';

export default class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {'restaurantReviewed': {}};
    }

    static propTypes = {
        handleReviewSubmit: PropTypes.func,
        restaurantReviewed: PropTypes.object
    }

    handleReviewSubmit = (grade, text) => {
        this.props.handleReviewSubmit(grade, text);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurantReviewed != null) {
            this.setState({
                restaurantReviewed: nextProps.restaurantReviewed
            });
        }
    }

    render() {
        return (
            <div id='add-review-popup' className='popup'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='popUpContainer'>
                            <ModalHeader
                                restaurantReviewed={this.state.restaurantReviewed}
                            />
                            <ModalBody
                                handleReviewSubmit={this.handleReviewSubmit}
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