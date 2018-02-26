import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({restaurantNumber, className}) => (
    <p className={className}>
        {restaurantNumber}  résultats trouvés
    </p>
);

Paragraph.propTypes = {
    restaurantNumber: PropTypes.number,
    className: PropTypes.string
}

export default Paragraph;