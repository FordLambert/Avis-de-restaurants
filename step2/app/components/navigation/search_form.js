import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';
import SearchLabel from './search_label';

export default class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grade: {min: 0, max: 5},
            order: 'grade'
        }
    }

    static propTypes = {
        handleSubmit: PropTypes.func
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let grade = this.state.grade;
        let order = this.state.order;
        this.props.handleSubmit(grade, order);
    }

    render() {
        return (
            <form className="col-11 col-lg-10" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <SearchLabel
                        content={'Note moyenne entre:'}
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
                    <select className={'form-control'} id='order-option' ref={'order'} onChange={event => this.setState({ order: event.target.value })}>
                        <option value='grade'>Note</option>
                        <option value='distance'>Distance</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-secondary" value="C'est parti !" />
            </form>
        );
    }
}