import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BannerGuide from './banner_guide';

export default class AddRestaurantButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'addRestaurantMode': false,
            'content': 'Ajouter un restaurant',
            'bannerClassName': ' d-none'
        };
    }

    static propTypes = {
        toggleAddRestaurant: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    toggleButton() {
        if (!this.state.addRestaurantMode) {
            this.setState({
                addRestaurantMode: true,
                content: 'Sortir de l\'ajout de restaurant',
                bannerClassName:  ' d-block'
            });
            this.props.toggleAddRestaurant(true);

        } else {
            this.setState({
                addRestaurantMode: false,
                content: 'Ajouter un restaurant',
                bannerClassName: ' d-none'
            });
            this.props.toggleAddRestaurant(false);
        }
    }

    handleClick = () => {
        this.toggleButton();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.canAddRestaurant) {
            this.setState({
                addRestaurantMode: false,
                content: 'Ajouter un restaurant',
                bannerClassName: ' d-none'
            });
        }
    }

    render() {
        return (
            <div>
                <button className={'btn btn-info'} onClick={this.handleClick}>
                    {this.state.content}
                </button>
                <BannerGuide
                    className={this.state.bannerClassName}
                />
            </div>
        );
    }
}