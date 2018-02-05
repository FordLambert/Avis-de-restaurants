import React from 'react';

import {Logo} from './logo';
import {MainTitle} from './main-title';
import {SearchForm} from './search-form';

export class Navigation extends React.Component {

    render() {
        return (
            <nav className={'col-12 col-md-3 text-center'}>  
                <div className={'row justify-content-center'}>
                    <Logo />
                    <MainTitle />
                    <SearchForm />
                </div>
            </nav>
        );
    }
}