import React from 'react';

const CloseLink = ({className, content}) => (
    <a href={'#!'} className={className}>
        {content}
    </a>
);

export default CloseLink;