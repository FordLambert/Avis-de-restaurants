import React from 'react';

import {ProfilPicture} from './profil-picture';
import {ReviewRating} from './review-rating';
import {Paragraphe} from './paragraphe';

export class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            'pictureName': 'loutre.png',
            'userName': 'Sophie44'
        };
    }

    render() {
        return (
            <div className={'col-10 review'}>
                <div className={'row justify-content-around'}>

                    <ProfilPicture 
                        pictureName={this.state.pictureName}
                        userName={this.state.userName}
                    />

                    <div className={'col-12 col-sm-9'}>
                        <div className={'row justify-content-start'}>

                            <div className={'col-sm-11 rating-zone'}>
                                
                                <ReviewRating 
                                    grade={this.props.reviewGrade}
                                />

                                <Paragraphe
                                    className={'col-sm-12 rating-date'}
                                    content={'Date du repas: 17 janvier 2018'}
                                />
                            </div>

                            <Paragraphe 
                                className={'col-sm-11'}
                                content ={this.props.reviewText}
                            />

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}