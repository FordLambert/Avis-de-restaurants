import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ReviewForm from './ReviewForm';

export default class ModalBody extends Component {

    static propTypes = {
        handleReviewSubmit: PropTypes.func
    }

    handleReviewSubmit = (grade, text) => {
        this.props.handleReviewSubmit(grade, text);
    }
  
    render() {
        return (
            <div className='modal-body'>
                <div className='row justify-content-center'>
                    <ReviewForm
                        handleReviewSubmit={this.handleReviewSubmit}
                    />
                </div>
            </div>
        );
    }
}