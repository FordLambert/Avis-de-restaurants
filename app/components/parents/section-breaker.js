import React from 'react';

import {Paragraphe} from './../independant/paragraphe';

export class SectionBreaker extends React.Component {

    render() {
        return (
            <div className={this.props.className}>
                <Paragraphe 
                    content={'17  résultats trouvés'}
                />
            </div>
        );
    }
}