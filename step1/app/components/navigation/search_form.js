import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StarRange from './star-range';
//import OrderSelect from './order_select';
import SearchLabel from './search_label';
import ReviewListButton from "../main_section/restaurant_section/restaurant_list/review_list_button";

export default class SearchForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func
    }

    handleSubmit = (event) => {
        let city = this.refs.city.value;
        let grade = this.refs.grade.value;
        let order = this.refs.order.value;
        this.props.handleSubmit(city, grade, order);
    }

    render() {
        return (
            <form className="col-12 col-lg-10" onSubmit={this.handleSubmit.bind(this)}>

                <div className="form-group">
                    <input
                        id={'location-input'}
                        placeholder={'Entrer une ville'}
                        className={'form-control'}
                        ref={'city'}
                    />
                </div>

                <div className="form-group">

                    <SearchLabel
                        labelContent={'Note moyenne minimum:'}
                    />
                    <input ref={'grade'} type={'range'} min={'1'} max={'5'} step={'1'}/>
                    <StarRange />

                </div>
                <div className="col-12">
                    <div className="row justify-content-between">
                        <p className="col-2">1</p>
                        <p className="col-2">2</p>
                        <p className="col-2">3</p>
                        <p className="col-2">4</p>
                        <p className="col-2">5</p>
                    </div>
                </div>

                <div className="form-group">
                    <SearchLabel
                        content={'Trier par:'}
                    />

                    <select className={'form-control'} id='order-option' ref={'order'}>
                        <option value='distance'>Du plus proche au plus loin</option>
                        <option value='grade'>Du mieux au moins bien noté</option>
                    </select>
                </div>

                <input type="submit" className="btn btn-secondary" value="C'est parti !"></input>
            </form>
        );
    }
}