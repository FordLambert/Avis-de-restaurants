import React from 'react';

export class Picture extends React.Component {

    render() {
        let pictureName = 'ressources/pictures/' + this.props.pictureName;

        return (
            <img src={pictureName} className={this.props.className} alt={this.props.alt} />
        );
    }
}