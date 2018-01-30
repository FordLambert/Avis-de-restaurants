import React from 'react';

import {Review} from './review';
import {SlidingLabel} from './sliding-label';
import {SlidingInput} from './sliding-input';

export class SlidingAside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'reviewsArray': []};
    }

    addReview() {
        for (let i = 0; i < 4; i++) {
            let newReview = <Review />
            this.state.reviewsArray.push(newReview);
        }
    }
  
    render() {
        this.addReview();

        return (
            <div className={'sliding-wrapper'}>
                <SlidingInput />

                <aside>
                    <div className="row justify-content-center">

                        <SlidingLabel />
                        {this.state.reviewsArray}
                        
                    </div>
                </aside>
            </div>
        );
    }
}