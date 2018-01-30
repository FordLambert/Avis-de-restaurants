import React from 'react';

export class Logo extends React.Component {

    render() {
        return (
            <a href={'#'}>
                <img src={'ressources/pictures/logo.png'} className={'nav-logo'} alt={'logo-picture'} />  
            </a>
        );
    }
}