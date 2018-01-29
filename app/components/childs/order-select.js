import React from 'react';

import {Option} from './../independant/option';

export class OrderSelect extends React.Component {

    render() {
        return (
            <select className={this.props.selectClass}>
                <Option
                    optionContent={'Du plus proche au plus loin'}
                />
                <Option 
                    optionContent={'Du mieux au moins bien noté'}
                />
            </select>
        );
    }
}