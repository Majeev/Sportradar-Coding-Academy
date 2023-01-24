import { React, useState } from 'react';
import css from './AltNavbar.module.css';

function AltNavbar({ data }) {
    const [userScrolled, setUserScrolled] = useState(false);

    const showNavbar = () => {
        if (window.scrollY >= window.innerHeight * 0.15) {
            setUserScrolled(true);
        } else {
            setUserScrolled(false);
        }
    };

    window.addEventListener('scroll', showNavbar);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div
            onClick={scrollToTop}
            role='button'
            className={`w-100 center-all py-3 px-2 position-fixed box-shadow-28 ${
                !userScrolled ? css.scroll__navbar : css.scroll__moved
            }`}>
            <div className={`d-grid grid-3x1 ${css.result__container}`}>
                <div className='font-small center-all'>
                    <span>{data.home}</span>
                </div>
                <div
                    className={`${css.score__container} font-large fw-500 center-all`}>
                    <span>{data.homeScore}</span>
                    <span>-</span>
                    <span>{data.awayScore}</span>
                </div>
                <div className='font-small center-all'>
                    <span>{data.away}</span>
                </div>
            </div>
        </div>
    );
}

export default AltNavbar;
