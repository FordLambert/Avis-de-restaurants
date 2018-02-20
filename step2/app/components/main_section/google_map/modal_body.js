import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ModalBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: ''
        };
    }

    static propTypes = {
        handleSubmit: PropTypes.func
    }

    handleChange = (userInput) => {
        this.setState({restaurantName: userInput.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        window.location = '#!';
        this.props.handleSubmit(this.state.restaurantName);
    }
  
    render() {
        return (
            <div className={'modal-body'}>
                <div className="row justify-content-center">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group text-center">
                            <input
                                className={'form-control'}
                                type={'text'}
                                placeholder={'Nom du restaurant'}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group text-center">
                            <input
                                type={'submit'}
                                value={'Ajouter'}
                                className={'btn btn-info'}
                            />
                        </div>
                    </form>
                    <div className={'col-10 cancel'}>
                        <p>Si vous avez cliqué par erreur, vous pouvez simplement
                            <a href={'#!'} className={'btn btn-danger cancel-button'}>Annuler</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}