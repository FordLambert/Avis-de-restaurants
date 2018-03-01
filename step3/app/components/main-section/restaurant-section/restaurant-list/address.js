import React from 'react';
import PropTypes from 'prop-types';

const Address = ({street, city}) => (
    <p>
        {street}
        <br/>
        {city}
    </p>
);

Address.propTypes = {
    street: PropTypes.string,
    city: PropTypes.string,
}

export default Address;