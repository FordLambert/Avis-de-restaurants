import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Navigation from './navigation/navigation';
import MainSection from './main-section/main-section';

class GoogleMiam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: {},
            order: ''
        };
    }

    //handle the form's submit for custom restaurant options
    handleSubmit = (grade, order) => {
        this.setState({grade: grade, order: order });
    }

    render() {
        return (
            <div className="row">
                <Navigation
                    handleSubmit={this.handleSubmit}
                />
                <MainSection
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