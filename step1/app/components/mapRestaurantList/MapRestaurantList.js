import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GoogleMap from './GoogleMap/GoogleMap';
import SearchResultFound from './SearchResultsFound/SearchResultsFound';
import RestaurantSection from './RestaurantSection/RestaurantSection';

export default class MapRestaurantList extends Component {

    static propTypes = {
        handleMarkerClick: PropTypes.func,
        handleMapLoad: PropTypes.func,
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
    }

    handleMarkerClick = (restaurant) => {
        this.props.handleMarkerClick(restaurant);
    }

    handleMapLoad = (geolocCoordinates) => {
        this.props.handleMapLoad(geolocCoordinates);
    }

    render() {
        return (
            <section className='col-12 col-md-9 col-xl-10 main-section' id='main-section'>
                <div className='row'>
                    <GoogleMap
                        restaurantList={this.props.restaurantList}
                        handleMapLoad={this.handleMapLoad}
                        handleMarkerClick={this.handleMarkerClick}
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