import React from 'react';

import {Thumbnail} from './../childs/thumbnail';
import {Title} from './../independant/title';
import {SearchForm} from './../childs/search-form';

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'reviewsArray': []};
    }

    render() {

        return (
            <nav className={this.props.navClass}>  
                <div className={this.props.wrapperClass}>

                    <Thumbnail 
                        href={'#'}
                        fileName={'logo'}
                        pictureClass={'nav-logo'}
                        alt={'main-logo'}
                    />

                    <Title 
                        titleTag={'h1'}
                        titleContent={'Cherchez un restaurant'}
                        titleClass={'col-md-12'}
                    />

                    <SearchForm />
                
                </div>
            </nav>
        );
    }
}