import React from 'react';

import {Picture} from './../independant/picture';

export class ProfilPicture extends React.Component {

    render() {
        return (
            <div className={this.props.profilWrapperClass}>	
                <Picture fileName={this.props.fileName} className={this.props.pictureClass} alt={this.props.alt} />
                <figcaption>{this.props.userName}</figcaption>
		    </div>
        );
    }
}