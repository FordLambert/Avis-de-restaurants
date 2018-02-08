import React, {Component} from 'react';

import GoogleMap from './google_map/google_map';
//import TestMap from './google_map/test-map';

import SectionBreaker from './section_breaker/section_breaker';
import RestaurantSection from './restaurant_section/restaurant_section';

export default class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {'restaurantList': []};
    }

    componentWillMount() {
        document.addEventListener('new-list-created', function(restaurantList) {
            this.setState({restaurantList: restaurantList.detail});
        }.bind(this));
    }

    render() {
        return (
            <section className="col-12 col-md-9 main-section" id="main-section">
                <div className="row">

                    <GoogleMap />

                    <SectionBreaker
                        restaurantNumber={this.state.restaurantList.length}
                    />

                    <RestaurantSection
                        restaurantList={this.state.restaurantList}
                    />

                </div>
            </section>
        );
    }
}