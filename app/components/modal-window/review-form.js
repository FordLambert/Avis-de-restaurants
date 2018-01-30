import React from 'react';

import {ReviewRating} from './review-rating';
import {ReviewLabel} from './review-label';
import {ReviewInput} from './review-input';
import {ReviewTextArea} from './review-text-area';
import {SubmitButton} from './submit-button';

export class ReviewForm extends React.Component {

    render() {
        return (
            <form className={'col-md-10'}>

                <div className="form-group text-center">
                    <ReviewRating />
                </div>

                <div className="form-group">
                    <ReviewLabel />

                    <div>
                        <ReviewInput 
                            type={'date'}
                            defaultValue={'2018-01-24'}
                            id={'date-input'}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <ReviewInput 
                        type={'text'}
                        placeholder={'Votre nom'}
                    />
                </div>

                <div className="form-group">
                    <ReviewTextArea />
                </div>

                <div className="text-center">
                    <SubmitButton />
                </div>

            </form>
        );
    }
}