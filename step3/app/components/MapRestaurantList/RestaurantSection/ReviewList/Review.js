import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from './ProfilePicture';
import ReviewRating from './ReviewRating';
import Paragraph from './Paragraph';

export default class Review extends Component {

    static propTypes = {
        review: PropTypes.object
    }

    render() {
        return (
            <div className='col-10 col-lg-5 review'>
                <div className='row'>
                    <ProfilePicture
                        src={this.props.review.profile_photo_url}
                        userName={this.props.review.author_name}
                    />
                    <div className='col-12'>
                        <div className='row justify-content-around'>
                            <div className='col-sm-11 rating-zone'>
                                <ReviewRating 
                                    grade={this.props.review.rating}
                                />
                            </div>
                            <Paragraph
                                className='col-11'
                                content ={this.props.review.text}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}