import React from 'react';

export class SlidingAsideButton extends React.Component {

    render() {
        return (	
            <label htmlFor={'review-list'} className={'col-sm-5 col-xl-3 btn btn-success trigger-button'} onClick={this.props.handleClick}>
                Lire les avis
            </label>
        );
    }
}