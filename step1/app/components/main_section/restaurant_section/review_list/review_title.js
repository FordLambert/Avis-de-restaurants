import React from 'react';

export class ReviewTitle extends React.Component {

    render() {
        return (
            <div className={'text-center offset-2 col-5'}>	
                <h2>
                    {this.props.content}
                </h2>
            </div>
        );
    }
}