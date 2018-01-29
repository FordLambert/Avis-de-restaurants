import React from 'react';

export class Title extends React.Component {

  render() {
    const TitleTag = this.props.titleTag;

    return (
        <TitleTag className={this.props.titleClass}>{this.props.titleContent}</TitleTag>
    );
  }
}