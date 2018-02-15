import React, {Component} from 'react';
import PropTypes from "prop-types";

import Map from './map';
import Pulser from './loading_pulser';

export default class GoogleMap extends Component {
    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        handleOpenReview: PropTypes.func
    }

    handleMapLoad = () => {
        this.props.handleMapLoad();
    }

    handleOpenReview = (restaurant) => {
        window.location = '#review-list';

        this.props.handleOpenReview(restaurant);
    }

    render() {
        return (
            <div id={'map'}>
                <Pulser />
                <Map
                    list={this.props.restaurantList}
                    handleMapLoad={this.handleMapLoad}
                    handleOpenReview={this.handleOpenReview}
                />
            </div>
        );
    }
}