import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({handleChange}) => (
    <textarea
        className='form-control'
        rows='5'
        placeholder='Donnez votre avis'
        onChange={handleChange}
    />
);

TextArea.proptypes = {
    handleChange: PropTypes.func
}

export default TextArea;