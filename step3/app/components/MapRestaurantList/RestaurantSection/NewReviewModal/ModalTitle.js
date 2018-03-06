import React from 'react';
import PropTypes from 'prop-types';

const ModalTitle = ({restaurantName}) => (
    <div className='col-12 text-center'>
       <h2 className='modal-title'>
          {restaurantName}
       </h2>
    </div>
);

ModalTitle.protypes = {
  restaurantName: PropTypes.string
}

export default ModalTitle;