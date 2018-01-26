import React from 'react';

import {Picture} from './../independant/picture';

export class Thumbnail extends React.Component {

    render() {
        return (
            <div className={this.props.wrapperClass}>
                <a href={this.props.href}>
                    <Picture fileName={this.props.fileName} className={this.props.pictureClass} alt={this.props.alt} />  
                </a>
            </div>
        );
    }
}