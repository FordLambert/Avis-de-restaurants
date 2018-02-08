import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchInput extends Component {
    static propTypes = {
        id: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        defaultValue: PropTypes.number,
        ref: PropTypes.string
    }

    render() {
        return (
            <input
                id={this.props.id}
                className={'form-control'}
                placeholder={this.props.placeholder}
                type={this.props.type}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                defaultValue={this.props.value}
                ref='aaaaaaaaaaa'
            />
        );
    }
}


