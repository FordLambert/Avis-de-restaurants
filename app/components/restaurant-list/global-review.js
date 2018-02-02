import React from 'react';

import {Picture} from './picture';
import {Paragraphe} from './paragraphe';

export class GlobalReview extends React.Component {

    render() {
        return (
            <div className={'offset-4 col-4 offset-sm-0 col-md-3 col-lg-6 col-xl-3 order-lg-3 text-center'}>	
                <Picture 
                    pictureName={this.props.pictureName} 
                    className={'img-fluid'} 
                    alt={'star-picture'} 
                />
                
                <Paragraphe content={this.props.averageGrade + '/5'} />
		    </div>
        );
    }
}