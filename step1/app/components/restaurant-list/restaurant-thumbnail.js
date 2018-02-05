import React from 'react';

import {Picture} from './picture';

export class RestaurantThumbnail extends React.Component {

    render() {
        return (
            <div className={'d-none d-sm-block col-sm-4 col-lg-6 col-xl-4 text-center order-lg-2 order-xl-1 align-self-center'}>
                <a href={this.props.href}>
                    <Picture 
                        pictureName={this.props.pictureName}
                        className={'restaurant-picture rounded img-fluid'}
                        alt={'restaurant-picture'}
                    />  
                </a>
            </div>
        );
    }
}