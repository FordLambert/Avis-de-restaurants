import React from 'react';
import PropTypes from 'prop-types';

import Picture from './picture';

const ProfilePicture = ({pictureName, userName}) => (
    <div className={'col-6 col-sm-3 text-center'}>

        <Picture
            pictureName={pictureName}
            className={'user-thumbnail rounded-circle img-fluid'}
            alt={'user-picture'}
        />

        <figcaption>{userName}</figcaption>

    </div>
);

ProfilePicture.propTypes = {
    pictureName: PropTypes.string,
    username: PropTypes.string
}

export default ProfilePicture;

