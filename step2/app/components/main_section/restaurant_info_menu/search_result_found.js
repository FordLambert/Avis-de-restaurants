import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsFound = ({restaurantNumber, className}) => (
    <p className={className}>
        {restaurantNumber}  résultats trouvés
    </p>
);

SearchResultsFound.propTypes = {
    restaurantNumber: PropTypes.number,
    className: PropTypes.string
}

export default SearchResultsFound;