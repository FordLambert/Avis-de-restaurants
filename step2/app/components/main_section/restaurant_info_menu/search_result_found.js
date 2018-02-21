import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({restaurantNumber}) => (
    <p>
        {restaurantNumber}  résultats trouvés
    </p>
);

Paragraph.propTypes = {
    restaurantNumber: PropTypes.number
}

export default Paragraph;