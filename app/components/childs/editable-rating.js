import React from 'react';

import StarRatingComponent from 'react-star-rating-component';

export class EditableRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 1
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const { rating } = this.state;

        return (                
            <div className={this.props.className}>
                <StarRatingComponent 
                    name="rate1" 
                    starCount={this.props.starNumber}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}