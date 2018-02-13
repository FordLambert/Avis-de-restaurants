import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({content}) => (
    <p>{content}</p>
);

Paragraph.propTypes = {
    content: PropTypes.string
}

export default Paragraph;