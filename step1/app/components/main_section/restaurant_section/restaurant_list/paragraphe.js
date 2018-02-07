import React from 'react';
import PropTypes from 'prop-types';

const Paragraphe = ({content}) => (
    <p>{content}</p>
);

Paragraphe.propTypes = {
    content: PropTypes.string
}

export default Paragraphe;