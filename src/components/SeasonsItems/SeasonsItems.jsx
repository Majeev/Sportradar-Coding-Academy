import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function SeasonsItems({ name, id }) {
    return <Dropdown.Item eventKey={id}>{name}</Dropdown.Item>;
}

export default SeasonsItems;
