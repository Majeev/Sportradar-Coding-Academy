import React, { useEffect, useState } from 'react';

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
    );
}

export default MatchesTable;
