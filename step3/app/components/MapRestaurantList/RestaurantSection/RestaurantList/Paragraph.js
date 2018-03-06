import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({spanClass, dynamicContent, staticContent}) => (
    <p>
        <span className={spanClass}>
            {dynamicContent}
        </span>
        {staticContent}
    </p>
);

Paragraph.propTypes = {
    spanClass: PropTypes.string,
    staticContent: PropTypes.string
}

export default Paragraph;