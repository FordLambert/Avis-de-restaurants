import React from 'react';

import {Picture} from './../independant/picture';

export class GlobalStar extends React.Component {

    render() {
        return (
            <div className={this.props.starWrapperClass}>	
                <Picture fileName={this.props.starColor} className={'img-fluid'} alt={'star-picture'} />
                <p>{this.props.globalGrade}/5</p>
		    </div>
        );
    }
}