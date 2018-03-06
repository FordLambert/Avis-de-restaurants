import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ReviewRating from './ReviewRating';
import TextArea from './TextArea';

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'grade': 0,
            'text': ''
        };
    }

    static propTypes = {
        handleReviewSubmit: PropTypes.func
    }

    handleGradeChange = (newGrade) => {
        this.setState({grade: newGrade});
    }

    handleTextChange = (event) => {
        this.setState({text: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //close modal
        window.location = '#!';

        this.props.handleReviewSubmit(
          this.state.grade,
          this.state.text
        );

        this.setState({grade: 0});
        this.reviewForm.reset();
    }

    render() {
        return (
            <form ref={(el) => this.reviewForm = el} className='col-md-10' onSubmit={this.handleSubmit}>
                <div className='form-group text-center'>
                    <ReviewRating
                        handleChange={this.handleGradeChange}
                        rating={this.state.grade}
                    />
                </div>
                <div className='form-group'>
                    <TextArea
                        handleChange={this.handleTextChange}
                    />
                </div>
                <div className='text-center'>
                    <input type='submit' className='btn btn-info' value='Envoyer' />
                </div>
            </form>
        );
    }
}