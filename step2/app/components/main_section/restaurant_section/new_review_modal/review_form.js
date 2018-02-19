import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ReviewRating from './review_rating';
import TextArea from './text_area';

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'grade': 0,
            'review': ''
        };
    }

    static propTypes = {
        handleReviewSubmit: PropTypes.func
    }

    handleGradeChange = (newGrade) => {
        this.setState({grade: newGrade});
    }

    handleReviewChange = (event) => {
        this.setState({review: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('SUBMIIIIIT !');
        this.props.handleReviewSubmit(
          this.state.grade,
          this.state.review
        );
    }

    render() {
        return (
            <form className={'col-md-10'} onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group text-center">
                    <ReviewRating
                        handleChange={this.handleGradeChange}
                    />
                </div>
                <div className="form-group">
                    <TextArea
                        handleChange={this.handleReviewChange}
                    />
                </div>
                <div className="text-center">
                    <input type={'submit'} className={'btn btn-info'} value={'Envoyer'} />
                </div>
            </form>
        );
    }
}