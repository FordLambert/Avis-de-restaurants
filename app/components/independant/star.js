import React from 'react';
import {Picture} from './picture';

export class GlobalStar extends React.Component {

    render() {
        /*let src = this.props.src //ressources/pictures/orange-star.png --  <img src={src} className="img-fluid" alt="star-picture">*/

        return (
            <div className="offset-4 col-4 offset-sm-0 col-md-3 col-lg-6 col-xl-3 order-lg-3 text-center">	
                
                <Picture fileName={this.props.starColor} className={'img-fluid'} alt={'test-picture'} />
                <p>{this.props.globalGrade}/5</p>
		    </div>
        );
    }
}