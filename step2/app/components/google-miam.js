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

    handleUserChoicesSubmit = (grade, order) => {
        this.setState({
            grade: grade, 
            order: order 
        });
    }

    render() {
        return (
            <div className='row'>
                <Navigation
                    handleUserChoicesSubmit={this.handleUserChoicesSubmit}
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