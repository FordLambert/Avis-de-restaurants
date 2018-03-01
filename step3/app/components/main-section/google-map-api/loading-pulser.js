import React from 'react';

//loading component, in case the map failed to load
const LoadingPulser = () => (
    <div className="pulser-wrapper">
        <div className="pulse-1 rounded-circle" />
        <div className="pulse-2 rounded-circle" />
    </div>
);

export default LoadingPulser;