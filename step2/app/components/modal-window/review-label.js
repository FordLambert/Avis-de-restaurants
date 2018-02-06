import React from 'react';

export class ReviewLabel extends React.Component {

    render() {
        return (
            <label htmlFor={'date-input'} className={'col-form-label'}>
                Date du repas
            </label>
        );
    }
}