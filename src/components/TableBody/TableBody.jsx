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
    status,
}) {
    const [color, setColor] = useState('');

    useEffect(() => {
        const checkResult = (home, away, status) => {
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
                : home === away && status !== 'postponed'
                ? setColor({
                      home: 'bg-warning',
                      away: 'bg-warning',
                  })
                : setColor({
                      home: '',
                      away: '',
                  });
        };

        checkResult(homeScore, awayScore, status);
    }, [date]);

    return (
        <tr>
            <td className={color.home}>{homeTeam}</td>
            <td className={color.away}>{awayTeam}</td>
            <td>
                {status !== 'postponed'
                    ? `${homeScore} - ${awayScore}`
                    : 'Postponed'}
            </td>
            <td>{date}</td>
            <td>
                {status !== 'postponed'
                    ? `${homeHalfScore} - ${awayHalfScore}`
                    : 'Postponed'}
            </td>
            <td>{stadium}</td>
        </tr>
    );
}

export default TableBody;
