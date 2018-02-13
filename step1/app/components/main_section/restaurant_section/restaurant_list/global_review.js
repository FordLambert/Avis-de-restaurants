import React from 'react';
import PropTypes from 'prop-types';

import Picture from './picture';
import Paragraph from './paragraph';

const GlobalReview = ({pictureName, averageGrade}) => (
    <div className={'offset-4 offset-sm-0 col-4 col-sm-3 col-md-4 text-center'}>
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