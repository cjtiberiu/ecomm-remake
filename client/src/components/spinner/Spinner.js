import React from 'react';

import './Spinner.css';

const Spinner = props => {

    const { height } = props;

    return (
        <div className='spinner-overlay' style={{ height: `${height ? height : '60vh'}`}}> 
            <div className='spinner-container' />
        </div>
    )

    
    
};

export default Spinner;