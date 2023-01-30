import React from 'react';
import css from './Loading.module.css';

function Loading() {
    return (
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='mb-4 '>Content is Loading...</h1>
            <div className={css.lds_spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading;
