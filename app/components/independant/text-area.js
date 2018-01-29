import React from 'react';

export class TextArea extends React.Component {

    render() {
        return (
            <textarea 
                className={this.props.className} 
                rows={this.props.rows} 
                placeholder={this.props.placeholder}>
            </textarea>
        );
    }
}