import React from 'react';
import PropTypes from 'prop-types';

const SearchLabel = ({htmlFor, className, content}) => (
    <label htmlFor={htmlFor} className={className}>
        {content}
    </label>
);

SearchLabel.propTypes = {
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string
};

export default SearchLabel;