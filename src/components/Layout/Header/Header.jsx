import React from 'react';

function Header({ title }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div
            role='button'
            className='box-shadow-58 w-100 position-sticky top-0 text-light bg-danger font-medium px-3 py-4'
            onClick={scrollToTop}>
            <span className='p-3'>{title}</span>
        </div>
    );
}

export default Header;
