import React from 'react';
import PropTypes from 'prop-types';

const ReviewTitle = ({content}) => (
    <div className={'text-center offset-2 col-5'}>
        <h2>
            {content}
        </h2>
    </div>
);

ReviewTitle.propTypes = {
    content: PropTypes.string
}

export default ReviewTitle;