import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function MatchesTable({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    date,
    halfTimeScore,
    stadium,
}) {
    const [color, setColor] = useState('');

    useEffect(() => {
        const checkResult = (home, away) => {
            home > away
                ? setColor({
                      home: 'bg-success',
                      away: 'bg-danger',
                  })
                : home < away
                ? setColor({
                      home: 'bg-danger',
                      away: 'bg-success',
                  })
                : setColor({
                      home: 'bg-warning',
                      away: 'bg-warning',
                  });
        };
        checkResult(homeScore, awayScore);
    }, []);

    return (
        <Table bordered size='sm' className='w-75 mx-auto' variant='dark'>
            {/* table not working properly on mobiles, have to work on responsiveness */}
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
            <tbody>
                <tr>
                    <td className={color.home}>{homeTeam}</td>
                    <td className={color.away}>{awayTeam}</td>
                    <td>
                        {homeScore} - {awayScore}
                    </td>
                    <td>{date}</td>
                    <td>{halfTimeScore}</td>
                    <td>{stadium}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default MatchesTable;
