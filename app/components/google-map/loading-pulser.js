import React from 'react';

export class Pulser extends React.Component {

    render() {
        return (
            <div className="pulser-wrapper">
                <div className="pulse-1 rounded-circle"></div>
                <div className="pulse-2 rounded-circle"></div>
            </div>
        );
    }
}