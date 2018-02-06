import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({id, placeholder, type, min, max, step, value}) => (
    <input
        id={id}
        className={'form-control'}
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        step={step}
        defaultValue={value}
    />
);

SearchInput.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number
};

export default SearchInput;



