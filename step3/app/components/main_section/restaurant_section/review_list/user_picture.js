import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class UserPicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'src': this.props.src
        }

        if (this.props.src == undefined) {
            this.setState({
                src: 'resources/pictures/user.png'
            });
        }
    }

    static propTypes = {
        src: PropTypes.string,
        className: PropTypes.string,
        alt: PropTypes.string
    }

    render() {
        return (
            <img
                src={this.state.src}
                className={this.props.className}
                alt={this.props.alt}
            />
        );
    }
}