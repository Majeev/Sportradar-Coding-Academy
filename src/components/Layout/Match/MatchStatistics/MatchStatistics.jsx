import React from 'react';
import Table from 'react-bootstrap/Table';

function MatchStatistics({ statistics, data }) {
    return (
        <Table
            fluid
            borderless
            className='text-center font-small align-middle tab'>
            <thead>
                <tr>
                    <th>{data.homeAbbreviation}</th>
                    <th>STATISTICS</th>
                    <th>{data.awayAbbreviation}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{statistics.home_possession}</td>
                    <td>Ball possesions</td>
                    <td>{statistics.away_possession}</td>
                </tr>
                <tr>
                    <td>{statistics.home_shots}</td>
                    <td>Shots</td>
                    <td>{statistics.away_shots}</td>
                </tr>
                <tr>
                    <td>{statistics.home_shots_on_target}</td>
                    <td>Shots on target</td>
                    <td>{statistics.away_shots_on_target}</td>
                </tr>
                <tr>
                    <td>{statistics.home_shots_saved || '0'}</td>
                    <td>Shots saved</td>
                    <td>{statistics.away_shots_saved || '0'}</td>
                </tr>
                <tr>
                    <td>{statistics.home_fouls}</td>
                    <td>Fouls</td>
                    <td>{statistics.away_fouls}</td>
                </tr>
                <tr>
                    <td>{statistics.home_yellow_cards}</td>
                    <td>Yellow cards</td>
                    <td>{statistics.away_yellow_cards}</td>
                </tr>
                <tr>
                    <td>{statistics.home_red_cards}</td>
                    <td>Red cards</td>
                    <td>{statistics.away_red_cards}</td>
                </tr>
                <tr>
                    <td>{statistics.home_corners}</td>
                    <td>Corners</td>
                    <td>{statistics.away_corners}</td>
                </tr>
                <tr>
                    <td>{statistics.home_throw_ins}</td>
                    <td>Throw ins</td>
                    <td>{statistics.away_throw_ins}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default MatchStatistics;
