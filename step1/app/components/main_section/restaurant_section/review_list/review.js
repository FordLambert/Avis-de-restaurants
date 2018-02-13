import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from './profile_picture';
import ReviewRating from './review_rating';
import Paragraph from './paragraph';


export default class Review extends Component {

    static propTypes = {
        review: PropTypes.object
    }

    render() {
        return (
            <div className={'col-10 review'}>
                <div className={'row'}>

                    <ProfilePicture
                        pictureName={'user.png'}
                        userName={'utilisateur'}
                    />

                    <div className={'col-12'}>
                        <div className={'row justify-content-around'}>

                            <div className={'col-sm-11 rating-zone'}>
                                
                                <ReviewRating 
                                    grade={this.props.review.stars}
                                />

                            </div>

                            <Paragraph
                                className={'col-11'}
                                content ={this.props.review.comment}
                            />

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}