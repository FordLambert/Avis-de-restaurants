import React from 'react';

export class Picture extends React.Component {

    render() {
        let src = 'ressources/pictures/' + this.props.fileName + '.png';

        return (	
            <img src={src} className={this.props.className} alt={this.props.alt} />
        );
    }
}