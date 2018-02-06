import React from 'react';

import {Pulser} from './loading-pulser';

export class GoogleMap extends React.Component {

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcJwz6_PgkDi-gLx0hoTsqoeowiwWoovc";
        script.async = false;
        script.defer = false;

        document.getElementById('map').appendChild(script);
    }

    render() {
        return (
            <div id={'map'}>
                <Pulser />
            </div>
        );
    }
}