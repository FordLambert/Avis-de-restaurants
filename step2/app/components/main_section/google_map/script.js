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

    componentDidMount() {
        const script = document.createElement("script");

        script.src = this.props.src;
        script.async = this.props.async;
        script.defer = this.props.defer;
        script.onload = this.props.callback;

        document.getElementById('script-wrapper').appendChild(script);
    }

    render() {
        return (
            <div id={'script-wrapper'}></div>
        );
    }
}
