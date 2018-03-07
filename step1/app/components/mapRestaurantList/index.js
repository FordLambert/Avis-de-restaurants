import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GoogleMap from './GoogleMap';
import SearchResultFound from './SearchResultsFound';
import RestaurantSection from './RestaurantSection';

export default class extends Component {

    static propTypes = {
        handleMarkerClick: PropTypes.func,
        handleMapLoad: PropTypes.func,
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
        onDragEnd: PropTypes.func
    }

    handleMarkerClick = (restaurant) => {
        this.props.handleMarkerClick(restaurant);
    }

    handleMapLoad = (geolocCoordinates, map) => {
        this.props.handleMapLoad(geolocCoordinates, map);
    }

    onDragEnd = (map) => {
        this.props.onDragEnd(map);
    }

    render() {
        return (
            <section className='col-12 col-md-9 col-xl-10 main-section' id='main-section'>
                <div className='row'>
                    <GoogleMap
                        restaurantList={this.props.restaurantList}
                        handleMapLoad={this.handleMapLoad}
                        handleMarkerClick={this.handleMarkerClick}
                        onDragEnd={this.onDragEnd}
                    />
                    <SearchResultFound
                        restaurantNumber={this.props.restaurantList.length}
                    />
                    <RestaurantSection
                        restaurantList={this.props.restaurantList}
                        restaurantRequested={this.props.restaurantRequested}
                    />
                </div>
            </section>
        );
    }
}