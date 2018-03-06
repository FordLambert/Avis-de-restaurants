import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({className, content}) => (
    <p className={className}>
        {content}
    </p>
);

Paragraph.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string
}

export default Paragraph;