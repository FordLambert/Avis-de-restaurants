import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AddRestaurantButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'addRestaurantMode': false,
            'content': 'Ajouter un restaurant'
        };
    }

    static propTypes = {
        toggleAddRestaurant: PropTypes.func
    }

    handleClick = () => {
        if (!this.state.addRestaurantMode) {
            this.setState({addRestaurantMode: true});
            this.setState({content: 'Sortir de l\'ajout de restaurant'});
            this.props.toggleAddRestaurant(true);
        } else {
            this.setState({addRestaurantMode: false});
            this.setState({content: 'Ajouter un restaurant'});
            this.props.toggleAddRestaurant(false);
        }
    }

    render() {
        return (
            <button className={'btn btn-info'} onClick={this.handleClick}>
                {this.state.content}
            </button>
        );
    }
}