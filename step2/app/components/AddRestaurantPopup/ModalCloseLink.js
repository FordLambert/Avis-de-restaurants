import React from 'react';
import PropTypes from 'prop-types';

const CloseLink = ({className, content}) => (
    <a href='#!' className={className}>
        {content}
    </a>
);

CloseLink.proptypes = {
    className: PropTypes.string,
    content: PropTypes.string
}

export default CloseLink;