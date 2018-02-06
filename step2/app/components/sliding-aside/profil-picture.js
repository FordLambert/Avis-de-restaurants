import React from 'react';

import {Picture} from './picture';

export class ProfilPicture extends React.Component {

    render() {
        return (
            <div className={'col-6 col-sm-3 text-center'}>

                <Picture
                    pictureName={this.props.pictureName}
                    className={'user-thumbnail rounded-circle img-fluid'}
                    alt={'user-picture'} 
                />

                <figcaption>{this.props.userName}</figcaption>

		    </div>
        );
    }
}