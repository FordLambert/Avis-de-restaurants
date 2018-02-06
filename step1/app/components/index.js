import React from 'react';
import ReactDOM from 'react-dom';

import {Navigation} from './navigation/navigation';
import {GoogleMap} from './google-map/google-map';
import {SectionBreaker} from './section-breaker/section-breaker';
import {ReviewList} from './review-list/review-list';
import {RestaurantList} from './restaurant-list/restaurant-list';

class Index extends React.Component {

    returnRestaurantClicked(restaurant) {

    }

    render() {
        return (
            <div className="row">

                <Navigation />
				
				<section className="col-12 col-md-9 main-section" id="main-section">
					<div className="row">

                        <GoogleMap />

                        <SectionBreaker />

						<div className="restaurant-section col-12">
                            <ReviewList />
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