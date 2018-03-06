import React from 'react';
import PropTypes from 'prop-types';

const SearchResultFound = ({restaurantNumber}) => (
    <div className='search-results-founds col-12 text-center'>
        <p>
            {restaurantNumber}  résultats trouvés
        </p>
    </div>
);

SearchResultFound.propTypes = {
    restaurantNumber: PropTypes.number
}

export default SearchResultFound;