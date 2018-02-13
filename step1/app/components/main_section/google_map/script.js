import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class Script extends Component {
    static propTypes = {
        src: PropTypes.string,
        async: PropTypes.bool,
        defer: PropTypes.bool,
        callback: PropTypes.func,
        wrapperId: PropTypes.string
    }

    //script is created here to avoid a new script creation on each render
    componentWillMount() {
        const script = document.createElement("script");

        script.src = this.props.src;
        script.async = this.props.async;
        script.defer = this.props.defer;
        script.onload = this.props.callback;

        document.body.appendChild(script);
    }

    render() {
        return (
            null
        );
    }
}
