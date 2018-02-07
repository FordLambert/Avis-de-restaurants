import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './navigation/navigation';
import MainSection from './main_section/main_section';

const Index = () => (
    <div className="row">
        <Navigation />
        <MainSection />
    </div>
);

ReactDOM.render(
    <Index />,
    document.getElementById('page-wrapper')
);