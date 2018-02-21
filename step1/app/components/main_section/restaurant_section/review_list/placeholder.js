import React from 'react';

import ClosingButton from './closing_button';

const Placeholder = () => (
    <div className={'offset-1 col-10 offset-lg-3 col-lg-6 placeholder'}>
        <div className='row justify-content-center'>
            <div className={'col-10'}>
                <h2>
                    Sélectionnez un restaurant pour voir les avis
                </h2>
            </div>
        </div>
        <div className={'row justify-content-center justify-content-md-end'}>
            <ClosingButton />
        </div>
    </div>
);

export default Placeholder;