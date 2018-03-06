import React from 'react';
import PropTypes from 'prop-types';

import Picture from './Picture';
import Paragraph from './Paragraph';

const GlobalReview = ({pictureName, averageGrade}) => (
    <div className='col-5 col-sm-12 text-center'>
        <Picture
            pictureName={pictureName}
            className='img-fluid'
            alt='star-picture'
        />
        <Paragraph
            content={averageGrade == undefined ? '0/5' : averageGrade + '/5'}
        />
    </div>
);

GlobalReview.propTypes = {
    pictureName: PropTypes.string,
    averageGrade: PropTypes.number
}

export default GlobalReview;