import React from 'react';

import {EditableRating} from './editable-rating';
import {Input} from './../independant/input';
import {Label} from './../independant/label';
import {TextArea} from './../independant/text-area';
import {Button} from './../independant/button';

export class ReviewForm extends React.Component {

    render() {
        return (
            <form className={this.props.formClass}>

                <div className="form-group text-center">
                    <EditableRating 
                        className={'form-rating'}
                        starNumber={5}
                    />
                </div>

                <div className="form-group">
                    <Label 
                        htmlFor={'date-input'}
                        labelClass={'col-form-label'}
                        labelContent={'Date du repas'}
                    />

                    <div>
                        <Input 
                            inputClass={'form-control'}
                            inputType={'date'}
                            defaultValue={'2018-01-24'}
                            inputId={'date-input'}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <Input 
                        inputClass={'form-control'}
                        inputType={'text'}
                        placeholder={'Votre nom'}
                    />
                </div>

                <div className="form-group">
                    <TextArea 
                        className={'form-control'}
                        rows={'5'}
                        placeholder={'Donnez votre avis'}
                    />
                </div>

                <div className="text-center">
                    <Button 
                        buttonType={'submit'}
                        buttonClass={'btn btn-info'}
                        buttonContent={'Envoyer'}
                    />
                </div>

            </form>
        );
    }
}