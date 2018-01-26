import React from 'react';
import ReactDOM from 'react-dom';

import {Thumbnail} from './../independant/thumbnail';
import {RestaurantDetails} from './../independant/restaurant-details';
import {GlobalStar} from './../independant/star';
import {RestaurantButtons} from './../independant/restaurant-buttons'

export class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'globalGrade': 4.2, 'starColor': '', 'restaurantArray': []};
    }

    addRestaurant() {
        for (let i = 0; i < 4; i++) {
            let newRestaurant = 
                <li className="restaurant col-10 col-lg-5  align-self-center">
                    <div className="row">
                        <Thumbnail 
                            wrapperClass={'d-none d-sm-block col-sm-4 col-lg-6 col-xl-4 text-center order-lg-2 order-xl-1 align-self-center'}
                            href={'#'}
                            fileName={'restaurant-1'}
                            pictureClass={'restaurant-picture rounded img-fluid'}
                            alt={'restaurant-picture'} 
                        />

                        <RestaurantDetails 
                            className={'col-12 col-sm-4 col-md-5 col-lg-12 col-xl-5 order-lg-1 order-xl-2 align-self-center'}
                            restaurantName={'Le Panda d\'Or'}
                            distance={'300m'}
                            reviewNumber={'14'}
                        />

                        <GlobalStar 
                            starWrapperClass={'offset-4 col-4 offset-sm-0 col-md-3 col-lg-6 col-xl-3 order-lg-3 text-center'}
                            globalGrade={this.state.globalGrade}
                            starColor={this.state.starColor} 
                        />
                    
                    </div>

                    <RestaurantButtons 
                        wrapperClass={'row justify-content-center justify-content-md-end'}
                        modalLink={'#popUp'}
                        modalButtonId={'openPopUp'}
                        modalButtonClass={'col-sm-5 col-md-3 col-lg-5 col-xl-3 btn btn-info'}
                        modalButtonText={'Votre avis'}
                        slidingId={'review-list'}
                        slidingButtonClass={'col-sm-5 col-md-3 col-lg-5 col-xl-3 btn btn-success trigger-button'} 
                        slidingButtonText={'Lire les avis'}
                    />
                </li>

            this.state.restaurantArray.push(newRestaurant);
        }
    }

    componentWillMount() {
        let grade = this.state.globalGrade;

        if (grade >= 1 && grade <= 2) {
            this.setState({starColor: 'red-star'});
        } else if (grade > 2 && grade < 4) {
            this.setState({starColor: 'orange-star'});
        } else if (grade >= 4 && grade <= 5) {
            this.setState({starColor: 'green-star'});
        } else {
            console.log('Error: rating must be  between 1 and 5')
        }
    }
  
    render() {
        this.addRestaurant();

        return (
           <ul className={'row justify-content-center justify-content-lg-around'}>{this.state.restaurantArray}</ul>
        );
    }
}


ReactDOM.render(
    <Restaurant />,
    document.getElementById('restaurant-list')
);