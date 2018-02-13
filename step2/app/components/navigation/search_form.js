import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';
//import OrderSelect from './order_select';
import SearchLabel from './search_label';
import ReviewListButton from "../main_section/restaurant_section/restaurant_list/review_list_button";

export default class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            grade: { min: 0, max: 5 },
            order: ''
        };
    }

    static propTypes = {
        handleSubmit: PropTypes.func
    }

    handleSubmit = () => {
        let city = this.refs.city.value;
        let grade = this.state.grade;
        let order = this.refs.order.value;
        this.props.handleSubmit(city, grade, order);
    }

    render() {
        return (
            <form className="col-11 col-lg-10" onSubmit={this.handleSubmit.bind(this)} >

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
                        content={'Note moyenne minimum:'}
                        className={'gradeLabel'}
                    />
                    <InputRange
                        maxValue={5}
                        minValue={0}
                        formatLabel={value => `${value}`}
                        value={this.state.grade}
                        step={1}
                        onChange={value => this.setState({ grade: value })}
                    />

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