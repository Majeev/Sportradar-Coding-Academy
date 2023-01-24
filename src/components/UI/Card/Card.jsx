import React from 'react';
import css from './Card.module.css';

function Card({ children, className }) {
    return (
        <div className={`w-80 mx-auto box-shadow-28 ${css.card} ${className}`}>
            {children}
        </div>
    );
}

export default Card;
