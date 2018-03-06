import React from 'react';
import PropTypes from 'prop-types';

const Input = ({className, type, value, placeholder, onChange}) => (
    <input
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    />
);

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default Input;