import React from 'react';
import Form from 'react-bootstrap/Form';
import css from './SeasonsDropdown.module.css';

function SeasonsDropdown({ children, onChange }) {
    const handleChange = (e) => {
        onChange({
            id: e.target.value,
            title: e.target.options[e.target.selectedIndex].text,
        });
    };

    return (
        <div className={`px-4 py-3 ${css.select__container}`}>
            <Form.Select
                className='select separation p-3 font-medium fw-500'
                onChange={handleChange}>
                {children}
            </Form.Select>
        </div>
    );
}

export default SeasonsDropdown;
