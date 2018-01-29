import React from 'react';

import {Review} from './../childs/review';

export class SlidingAside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'reviewsArray': []};
    }

    addReview() {
        for (let i = 0; i < 4; i++) {
            let newReview = <Review wrapperClass={'col-10 review'} />
            this.state.reviewsArray.push(newReview);
        }
    }
  
    render() {
        this.addReview();

        return (
            <div className={this.props.className}>
                <input type="checkbox" id="review-list" />
                <aside>
                    <div className="row justify-content-center">
                        <label htmlFor="review-list" className="offset-9 col-1 btn btn-info close-button">X</label>
                        {this.state.reviewsArray}
                    </div>
                </aside>
            </div>
        );
    }
}