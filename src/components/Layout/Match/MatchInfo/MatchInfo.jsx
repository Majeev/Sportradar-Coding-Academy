import React from 'react';
import css from './MatchInfo.module.css';

function MatchInfo({ data }) {
    return (
        <>
            <div
                className={`d-flex justify-content-center position-relative font-medium`}>
                <span
                    className={`position-absolute start-0 ${css.match__round}`}>
                    Matchday #{data.round}
                </span>
                <span>{data.season}</span>
            </div>
            <div className='d-flex justify-content-center font-medium'>
                <span>{`${data.start.slice(0, 10)} ${data.start.slice(
                    11,
                    16
                )}`}</span>
            </div>
            <div className='w-100 d-grid my-4 grid-3x1'>
                <div className='center-all font-medium'>
                    <span>{data.home}</span>
                </div>
                <div className='d-flex justify-content-evenly align-items-center font-xlarge fw-500'>
                    <span>{data.homeScore}</span>
                    <span>-</span>
                    <span>{data.awayScore}</span>
                </div>
                <div className='center-all font-medium'>
                    <span>{data.away}</span>
                </div>
            </div>
        </>
    );
}

export default MatchInfo;
