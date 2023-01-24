import React from 'react';
import css from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from '../icons';

function Navbar({ data }) {
    const navigate = useNavigate();

    return (
        <div
            className={`d-flex text-center align-items-center font-small ${css.navbar}`}>
            <button
                className={`font-large ${css.navbar__return}`}
                onClick={() => navigate(-1)}>
                <FiArrowLeft />
            </button>
            <span>{data.home}</span>
            <span>vs</span>
            <span>{data.away}</span>
        </div>
    );
}

export default Navbar;
