import React from 'react';

export class OrderSelect extends React.Component {

    render() {
        return (
            <select className={'form-control'}>
                <option>Du plus proche au plus loin</option>
                <option>Du mieux au moins bien noté</option>
            </select>
        );
    }
}