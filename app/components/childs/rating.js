import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

export class Rating extends React.Component {

  render() {
    return (
        <div className={this.props.wrapperClass}>
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