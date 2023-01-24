import React from 'react';

function EventDetails({ info, data }) {
    return (
        <div className='my-2r mx-4 d-flex flex-column'>
            <span className='font-medium'>
                {info.players ? info.players[0].name.replace(/,/g, ' ') : ''}
            </span>
            <span className='me-3 font-small'>
                {info.competitor === 'home'
                    ? data.home
                    : info.competitor === 'away'
                    ? data.away
                    : ''}
            </span>
        </div>
    );
}

export default EventDetails;
