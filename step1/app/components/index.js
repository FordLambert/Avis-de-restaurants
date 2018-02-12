import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Navigation from './navigation/navigation';
import MainSection from './main_section/main_section';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            grade: {},
            order: ''
        };
    }

    handleSubmit = (city, grade, order) => {
        this.setState({ city: city, grade: grade, order: order })
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
    <Index />,
    document.getElementById('page-wrapper')
);