import React from 'react';
import css from './Button.module.css';

function Button({ title, onClick }) {
    return (
        <button
            className={` ${css.button} w-50 p-3 font-medium`}
            onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;
