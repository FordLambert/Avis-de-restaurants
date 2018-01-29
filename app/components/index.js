import React from 'react';
import ReactDOM from 'react-dom';

import {Navigation} from './parents/navigation';
import {SectionBreaker} from './parents/section-breaker';
import {ModalWindow} from './parents/modal-window';
import {SlidingAside} from './parents/sliding-aside';
import {RestaurantList} from './parents/restaurant-list';

class Index extends React.Component {

    render() {
        return (
            <div className="row">

                <Navigation 
                    navClass={'col-12 col-md-3 text-center'}
                    wrapperClass={'row justify-content-center'}
                />
				

				<section className="col-12 col-md-9 main-section" id="main-section">
					<div className="row">

						<div id="map">
							<script async defer
								src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcJwz6_PgkDi-gLx0hoTsqoeowiwWoovc&callback=initMap">
							</script>
						</div>

                        <SectionBreaker 
                            className={'section-breaker col-12 text-center'}
                        />

						<div className="restaurant-section col-12">

                            <ModalWindow 
                                id={'popUp'}
                                className={'popup'}
                            />

                            <SlidingAside 
                                className={'sliding-wrapper'}
                            />

                            <RestaurantList 
                                className={'restaurant-list'}
                            />
							
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