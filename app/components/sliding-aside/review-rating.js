import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

export class ReviewRating extends React.Component {

  render() {
    return (
        <div className={'col-sm-12 rating'}>
            <StarRatingComponent
                name="app4"
                editing={false}
                starCount={5}
                value={this.props.starNumber}
            />
        </div>
    );
  }
}