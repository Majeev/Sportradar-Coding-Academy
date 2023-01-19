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
    let formatedStatus = ''

    status === 'postponed' || status === 'cancelled' ? formatedStatus = status.charAt(0).toUpperCase() + status.slice(1) : status
    
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
                : home === away && status === 'closed'
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
                {status === 'closed' 
                    ? `${homeScore} - ${awayScore}` 
                    : formatedStatus}
            </td>
            <td>{date}</td>
            <td>
                {status === 'closed'
                    ? `${homeHalfScore} - ${awayHalfScore}`
                    : formatedStatus}
            </td>
            <td>{stadium}</td>
        </tr>
    );
}

export default TableBody;
