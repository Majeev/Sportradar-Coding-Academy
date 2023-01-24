import React from 'react';

function SeasonsOption({ name, id }) {
    return <option value={id}>{name}</option>;
}

export default SeasonsOption;
