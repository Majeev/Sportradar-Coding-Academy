import React from 'react';

function Substitution({ info }) {
    return (
        <div className='font-small '>
            <div className='d-flex flex-column mb-3'>
                <span className='text-success fw-500 mb-1'>IN</span>
                <span>{info.players[1].name.replace(/,/g, ' ')}</span>
            </div>
            <div className='d-flex flex-column mb-4'>
                <span className='text-danger fw-500 mb-1'>OUT</span>
                <span>{info.players[0].name.replace(/,/g, ' ')}</span>
            </div>
        </div>
    );
}

export default Substitution;
