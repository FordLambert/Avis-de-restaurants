import React from 'react';
import PropTypes from 'prop-types';

import Picture from './picture';
import Paragraph from './paragraph';

const GlobalReview = ({pictureName, averageGrade}) => (
    <div className={'offset-4 col-4 offset-sm-0 col-md-3 col-lg-6 col-xl-3 order-lg-3 text-center'}>
        <Picture
            pictureName={pictureName}
            className={'img-fluid'}
            alt={'star-picture'}
        />

        <Paragraph content={averageGrade + '/5'} />
    </div>
);

GlobalReview.propTypes = {
    pictureName: PropTypes.string,
    averageGrade: PropTypes.number
}

export default GlobalReview;