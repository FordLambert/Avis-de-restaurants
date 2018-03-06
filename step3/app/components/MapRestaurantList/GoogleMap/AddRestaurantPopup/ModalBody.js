import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import InfoParagraph from './InfoParagraph';

export default class ModalBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //updated by user input
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
        //exit modal window
        window.location = '#!';
         //reset input value
         this.reviewForm.reset();
        //give the name to parent component
        this.props.handleSubmit(this.state.restaurantName);
    }
  
    render() {
        return (
            <div className='modal-body'>
                <div className='row justify-content-center'>
                    <form onSubmit={this.handleSubmit} ref={(element) => this.reviewForm = element}>
                        <div className='form-group text-center'>
                            <Input
                                className='form-control'
                                type='text'
                                placeholder='Nom du restaurant'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='form-group text-center'>
                            <Input
                                type='submit'
                                value='Ajouter'
                                className='btn btn-info'
                            />
                        </div>
                    </form>
                    <div className='col-10 cancel'>
                        <InfoParagraph />
                    </div>
                </div>
            </div>
        );
    }
}