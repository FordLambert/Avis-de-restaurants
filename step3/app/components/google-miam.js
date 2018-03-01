import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Navigation from './navigation/navigation';
import MainSection from './main-section/main-section';

class GoogleMiam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: null,
            grade: {},
            order: ''
        };
    }

    //handle the form's submit for custom restaurant options
    handleSubmit = (city, grade, order) => {
        this.setState({
            city: city,
            grade: grade,
            order: order
        });
    }

    render() {
        return (
            <div className="row">
                <Navigation
                    handleSubmit={this.handleSubmit}
                />
                <MainSection
                    city={this.state.city}
                    grade={this.state.grade}
                    order={this.state.order}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <GoogleMiam />,
    document.getElementById('page-wrapper')
);