import React from 'react';

function Goal({ info, data }) {
    return (
        <div className='w-100 d-grid mt-5 mb-2 grid-3x1'>
            <div className='center-all font-small'>
                <span className={info.competitor === 'home' && 'bold'}>
                    {data.homeAbbreviation}
                </span>
            </div>
            <div className='d-flex justify-content-evenly align-items-center font-small fw-500'>
                <span>{info.home_score}</span>
                <span>-</span>
                <span>{info.away_score}</span>
            </div>
            <div className='center-all font-small'>
                <span className={info.competitor === 'away' && 'bold'}>
                    {data.awayAbbreviation}
                </span>
            </div>
        </div>
    );
}

export default Goal;
