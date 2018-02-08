import React, {Component} from 'react';

import Map from './map';
import Pulser from './loading_pulser';

export default class GoogleMap extends Component {

    render() {
        return (
            <div id={'map'}>
                <Pulser />
                <Map />
            </div>
        );
    }
}