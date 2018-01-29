import React, { Component } from 'react';

import Slider from 'react-rangeslider';

export class RangeInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      volume: 0
    }
  }

  handleOnChange(value) {
    this.setState({
      volume: value
    })
  }

  render() {
    let { volume } = this.state
    return (
      <Slider
        className={'form-group banana'}
        value={volume}
        onChange={this.handleOnChange}
        min={1}
        max={5}
        step={5}
      />
    )
  }
}