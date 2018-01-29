import React from 'react';

import {Input} from './../independant/input';
import {OrderSelect} from './../childs/order-select';
import {Label} from './../independant/label';
//import {RangeInput} from './../independant/range-input'

export class SearchForm extends React.Component {

    render() {
        return (
            <form className="col-12 col-lg-10">


                <div className="form-group">
                    <Input 
                        inputClass={'form-control'}
                        placeholder={'Entrez une ville'}
                    />
                </div>

                <div className="form-group">
                    <Label 
                        labelContent={'Distance maximum:'}
                    />
                    <input type="range" min="1" max="4" step="1" className="form-control" />
                </div>
                <div className="col-12">
                    <div className="row justify-content-between">
                        <p className="col-2">2<span>km</span></p>
                        <p className="col-2">5<span>km</span></p>
                        <p className="col-2">10<span>km</span></p>
                        <p className="col-2">15<span>km</span></p>
                    </div>
                </div>

                <div className="form-group">
                    <Label 
                        labelContent={'Note moyenne minimum:'}
                    />
                    <Input 
                        inputClass={'form-control'}
                        inputType={'range'}
                        min={'1'}
                        max={'5'}
                        step={'1'}
                    />
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
                    <Label 
                        labelContent={'Trier par:'}
                    />

                    <OrderSelect 
                        selectClass={'form-control'}
                    />
                </div>

                <button type="button" className="btn btn-secondary">C'est parti !</button>
            </form>
        );
    }
}