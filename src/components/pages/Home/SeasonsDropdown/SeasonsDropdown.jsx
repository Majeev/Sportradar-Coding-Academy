import React from 'react';
import Form from 'react-bootstrap/Form';

function SeasonsDropdown({ children, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <Form.Select className='select' onChange={handleChange}>
            {children}
        </Form.Select>
    );
}

export default SeasonsDropdown;
