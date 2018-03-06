import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class StreetPicture extends Component {

    static propTypes = {
        restaurant: PropTypes.object
    }

    choosePictureSrc() {
        if (this.props.restaurant.photos == undefined) {
            const streetViewSrc = 'https://maps.googleapis.com/maps/api/streetview?' +
                'size=250x250' +
                '&location=' + this.props.restaurant.vicinity + '&fov=90&heading=235&pitch=10' +
                '&key=AIzaSyDNUGo0UwN5UI3gEYYLRlzdS-Rm53HMr_g'
            return streetViewSrc;

        } else {
            const googleSrc = this.props.restaurant.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250});
            return googleSrc;
        }
    }

    render() {
        return (
            <div className='col-10 text-center align-self-center street-picture-container'>
                <img
                    src={this.choosePictureSrc()}
                    className='img-fluid street-picture'
                    alt='street-view-picture'
                />
            </div>
        );
    }
}