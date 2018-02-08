import React, {Component} from 'react';

import InputRange from 'react-input-range';

export default class StarRange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: { min: 2, max: 4 },
        };
    }

    render() {
        return (
            <InputRange
                id={'banane'}
                maxValue={5}
                minValue={0}
                formatLabel={value => `${value}`}
                value={this.state.value}
                step={1}
                onChange={value => this.setState({ value: value })}
                onChangeComplete={value => console.log(value)}
            />
        );
    }
}