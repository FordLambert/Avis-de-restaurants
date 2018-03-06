import React from 'react';
import PropTypes from 'prop-types';

import Picture from './picture';

const ProfilePicture = ({pictureName, userName}) => (
    <div className='offset-1 col-10'>
        <div className='row justify-content-center justify-content-md-start text-center'>
            <div className='col-5 col-sm-3'>
                <Picture
                    pictureName={pictureName}
                    className='user-thumbnail rounded-circle img-fluid'
                    alt='user-picture'
                />
                <figcaption>
                    {userName}
                </figcaption>
            </div>
        </div>
    </div>
);

ProfilePicture.propTypes = {
    pictureName: PropTypes.string,
    username: PropTypes.string
}

export default ProfilePicture;