import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function MatchesTable({ homeTeam, awayTeam, homeScore, awayScore }) {
    return (
        <Table striped bordered hover size='sm' className='w-50 mx-auto'>
            <thead>
                <tr>
                    <th>Team Names</th>
                    <th>Results</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='w-75'>
                        {homeTeam} vs {awayTeam}
                    </td>
                    <td>
                        {homeScore} - {awayScore}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default MatchesTable;
