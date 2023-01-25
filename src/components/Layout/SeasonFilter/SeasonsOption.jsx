import React from 'react';

function SeasonsOption({ name, id }) {
    return <option className='bg-light' value={id}>{name}</option>;
}

export default SeasonsOption;
