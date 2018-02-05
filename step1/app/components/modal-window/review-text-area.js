import React from 'react';

export class ReviewTextArea extends React.Component {

    render() {
        return (
            <textarea 
                className={'form-control'} 
                rows={'5'} 
                placeholder={'Donnez votre avis'}>
            </textarea>
        );
    }
}