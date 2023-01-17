import React from 'react';
import Table from 'react-bootstrap/Table';

function TableHeaders({ children }) {
    return (
        <Table bordered size='sm' variant='dark'>
            <thead>
                <tr>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Result</th>
                    <th>Date</th>
                    <th>Half time score</th>
                    <th>Stadium</th>
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </Table>
    );
}

export default TableHeaders;
