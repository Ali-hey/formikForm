import React from 'react';

const Personalerror = ({children}) => {
    return (
        <small className='text-center d-block text-danger'>
            {children}
        </small>
    );
}

export default Personalerror;
