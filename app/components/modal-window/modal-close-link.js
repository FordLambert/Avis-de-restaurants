import React from 'react';

export class CloseLink extends React.Component {

  render() {
    return (
        <a href={'#!'} className={this.props.className}>
            {this.props.linkContent}
        </a>
    );
  }
}