import React from 'react';

export class Picture extends React.Component {

    render() {
        let src = 'ressources/pictures/' + this.props.fileName + '.png';
        let className = this.props.className;
        let alt = this.props.alt;

        return (	
            <img src={src} className={className} alt={alt} />
        );
    }
}