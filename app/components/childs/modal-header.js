import React from 'react';

import {Link} from './../independant/link';
import {Title} from './../independant/title';

export class ModalHeader extends React.Component {
  
    render() {
        return (
            <div className={this.props.className}>
                <Link 
                    href={'#!'}
                    linkClass={'close closePopUp'}
                    linkContent={'x'}
                />

                <Title 
                    titleTag={'h2'}
                    titleClass={'modal-title'}
                    titleContent={'Restaurant exemple'}
                />
            </div>
        );
    }
}