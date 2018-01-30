import React from 'react';

export class Paragraphe extends React.Component {

    render() {
        return (
            <p className={this.props.paragrapheClass}>{this.props.content}</p>
        );
    }
}