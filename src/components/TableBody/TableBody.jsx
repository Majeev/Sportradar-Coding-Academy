import React, { useEffect, useState } from 'react';

function TableBody({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    date,
    homeHalfScore,
    awayHalfScore,
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
            <td>
                {homeHalfScore} - {awayHalfScore}
            </td>
            <td>{stadium}</td>
        </tr>
    );
}

export default TableBody;
