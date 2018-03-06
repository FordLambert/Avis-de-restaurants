import React from 'react';
import PropTypes from 'prop-types';

const BannerGuide = ({className}) => (
    <div className={'banner-guide alert alert-info' + className} role='alert'>
        Cliquez sur un point de la carte pour ajouter un restaurant à cet endroit
    </div>
);

BannerGuide.proptypes = {
    className: PropTypes.string
}

export default BannerGuide;