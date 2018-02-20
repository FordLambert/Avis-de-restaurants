import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
        toggleAddRestaurant: PropTypes.func
    }

    handleClick = () => {
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

    render() {
        return (
            <div>
                <button className={'btn btn-info'} onClick={this.handleClick}>
                    {this.state.content}
                </button>
                <div className={'alert alert-info' + this.state.bannerClassName} role="alert">
                    Cliquez sur un point de la carte pour ajouter un restaurant à cet endroit
                </div>
            </div>
        );
    }
}