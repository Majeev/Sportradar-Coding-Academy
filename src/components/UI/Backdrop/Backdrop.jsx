import React from 'react';
import css from './Backdrop.module.css';

function Backdrop({ children, className }) {
    return (
        <div className={`p-3 box-shadow-28 ${css.backdrop} ${className}`}>
            {children}
        </div>
    );
}

export default Backdrop;
