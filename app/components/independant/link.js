import React from 'react';

export class Link extends React.Component {

  render() {
    return (
        <a href={this.props.href} className={this.props.linkClass}>
            {this.props.linkContent}
        </a>
    );
  }
}