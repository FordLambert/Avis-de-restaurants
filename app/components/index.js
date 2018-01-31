import React from 'react';
import ReactDOM from 'react-dom';

import {Navigation} from './navigation/navigation';
//import {Map} from ....
import {SectionBreaker} from './section-breaker/section-breaker';
import {ModalWindow} from './modal-window/modal-window';
import {SlidingAside} from './sliding-aside/sliding-aside';
import {RestaurantList} from './restaurant-list/restaurant-list';

class Index extends React.Component {

    render() {
        return (
            <div className="row">

                <Navigation />
				
				<section className="col-12 col-md-9 main-section" id="main-section">
					<div className="row">

						<div id="map">
							<script async defer
								src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcJwz6_PgkDi-gLx0hoTsqoeowiwWoovc&callback=initMap">
							</script>
						</div>

                        <SectionBreaker />

						<div className="restaurant-section col-12">
                            <ModalWindow />
                            <SlidingAside />
                            <RestaurantList />
						</div>

					</div>
				</section>

			</div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('page-wrapper')
);