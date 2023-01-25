import React from 'react';
import css from './Button.module.css';

function Button({ title, onClick, className }) {
    return (
        <button
            className={` ${className} ${css.button} rounded w-50 p-3 font-medium`}
            onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;
