import React from 'react';

export class SlidingLabel extends React.Component {

    render() {
        return (
            <label htmlFor={'review-list'} className={'offset-2 col-1 btn btn-info close-button'}>
                x
            </label>
        );
    }
}