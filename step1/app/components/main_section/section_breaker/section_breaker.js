import React from 'react';
import PropTypes from 'prop-types';

const SectionBreaker = ({restaurantNumber}) => (
    <div className={'section-breaker col-12 text-center'}>
        <p>{restaurantNumber}  résultats trouvés</p>
    </div>
);

SectionBreaker.propTypes = {
    restaurantNumber: PropTypes.number
}

export default SectionBreaker;