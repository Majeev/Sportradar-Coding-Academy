import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SeasonsDropdown({ children, onSelect }) {
    const handleSelect = (value) => {
        onSelect(value);
    };

    return (
        <DropdownButton
            id='dropdown-basic-button'
            title='season'
            onSelect={handleSelect}>
            {children}
        </DropdownButton>
    );
}

export default SeasonsDropdown;
