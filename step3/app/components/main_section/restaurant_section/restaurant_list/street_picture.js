import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class StreetPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
        };
    }

    static propTypes = {
        restaurant: PropTypes.object
    }

    componentWillMount() {
        if (this.props.restaurant.photos === undefined) {
            this.setState({
                src: 'https://maps.googleapis.com/maps/api/streetview?' +
                'size=250x250' +
                '&location=' + this.props.restaurant.vicinity + '&fov=90&heading=235&pitch=10' +
                '&key=AIzaSyDNUGo0UwN5UI3gEYYLRlzdS-Rm53HMr_g'
            });

        } else {
            const googleSrc = this.props.restaurant.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250});
            this.setState({
                src: googleSrc
            });
        }
    }

    render() {
        return (
            <div className={'d-none d-sm-block col-4 text-center align-self-center street-picture-container'}>
                <img
                    src={this.state.src}
                    className={'img-fluid'}
                    alt={'street-view-picture'}
                />
            </div>
        );
    }
}