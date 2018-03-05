import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Logo from './logo';
import MainTitle from './main-title';
import SearchForm from './search-form';

export default class Navigation extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func
    }

    handleUserChoicesSubmit = (city, grade, order) => {
        this.props.handleUserChoicesSubmi(city, grade, order);
    }

    render() {
        return (
            <nav className={'col-12 col-md-3 col-xl-2 text-center'}>
                <div className={'row justify-content-center'}>
                    <Logo />
                    <MainTitle />
                    <SearchForm
                        handleSubmit={this.handleUserChoicesSubmit}
                    />
                </div>
            </nav>
        );
    }
}