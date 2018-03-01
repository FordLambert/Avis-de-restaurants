import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ReviewForm from './review-form';

export default class ModalBody extends Component {

    static propTypes = {
        handleReviewSubmit: PropTypes.func
    }

    handleReviewSubmit = (grade, review) => {
        this.props.handleReviewSubmit(grade, review);
    }
  
    render() {
        return (
            <div className={'modal-body'}>
                <div className="row justify-content-center">
                    <ReviewForm
                        handleReviewSubmit={this.handleReviewSubmit}
                    />
                </div>
            </div>
        );
    }
}