import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class UserPicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'src': this.props.src
        }
    }

    static propTypes = {
        src: PropTypes.string,
        className: PropTypes.string,
        alt: PropTypes.string
    }

    defineSrc() {
        if (this.props.src == undefined) {
           return 'resources/pictures/user.png';
        } else {
            return this.props.src;
        }
    }

    render() {
        return (
            <img
                src={this.defineSrc()}
                className={this.props.className}
                alt={this.props.alt}
            />
        );
    }
}