import React from 'react';

export class SearchLabel extends React.Component {

    render() {
        return (
            <label htmlFor={this.props.htmlFor} className={this.props.labelClass}>
                {this.props.labelContent}
            </label>
        );
    }
}