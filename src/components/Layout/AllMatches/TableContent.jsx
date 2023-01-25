import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TableContent({ data }) {
    const [color, setColor] = useState({
        home: 'bg-dark',
        away: 'bg-dark',
        text: 'text-white',
    });
    let formatedStatus = '';

    data.status !== 'closed'
        ? (formatedStatus = (
              data.status.charAt(0).toUpperCase() + data.status.slice(1)
          ).replace('_', ' '))
        : data.status;

    useEffect(() => {
        const checkResult = (home, away, status) => {
            home > away
                ? setColor({
                      home: 'bg-success',
                      away: 'bg-danger',
                      text: 'text-light',
                  })
                : home < away
                ? setColor({
                      home: 'bg-danger',
                      away: 'bg-success',
                      text: 'text-light',
                  })
                : home === away && status === 'closed'
                ? setColor({
                      home: 'bg-warning',
                      away: 'bg-warning',
                      text: 'text-dark',
                  })
                : '';
        };

        checkResult(data.homeScore, data.awayScore, data.status);
    }, [data.id]);

    const navigate = useNavigate();
    const handleOnClick = () => {
        data.status === 'closed'
            ? navigate(`/match/${data.id}`)
            : alert(`Match ${formatedStatus} - No data provided`);
    };

    return (
        <tr role='button' onClick={() => handleOnClick({ data })}>
            <td className={`${color.home} ${color.text} fw-500`}>
                {data.homeTeam}
            </td>
            <td className={`${color.away} ${color.text} fw-500`}>
                {data.awayTeam}
            </td>
            <td>
                {data.status === 'closed'
                    ? `${data.homeScore} - ${data.awayScore}`
                    : formatedStatus}
            </td>
            <td>{`${data.date.slice(0, 10)} ${data.date.slice(11, 16)}`}</td>
            <td>
                {data.status === 'closed'
                    ? `${data.homeHalfScore} - ${data.awayHalfScore}`
                    : formatedStatus}
            </td>
            <td>{data.stadium}</td>
        </tr>
    );
}

export default TableContent;
