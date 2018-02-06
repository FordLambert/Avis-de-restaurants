import React from 'react';

export class Paragraphe extends React.Component {

    render() {
        return (
            <p className={this.props.className}>{this.props.content}</p>
        );
    }
}