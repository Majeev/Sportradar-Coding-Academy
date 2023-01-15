import { useState, useEffect } from 'react';
import './components/MatchesTable/MatchesTable';
import './App.css';
import MatchesTable from './components/MatchesTable/MatchesTable';
import Table from 'react-bootstrap/Table';

function App() {
    const [matches, setMatches] = useState([]);

    const fetchData = async () => {
        const res = await fetch(
            'https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=xhe2be3cvt86v6a2s8p98rf3'
        );
        const data = await res.json();

        const teamsData = data.schedules.map((game) => {
            return {
                homeTeam: game.sport_event.competitors[0].name,
                awayTeam: game.sport_event.competitors[1].name,
                homeScore: game.sport_event_status.home_score,
                awayScore: game.sport_event_status.away_score,
                date: game.sport_event.start_time,
                halfTimeScore: game.sport_event_status.period_scores
                    ? game.sport_event_status.period_scores[0].home_score
                    : 'Match was postponed',
                stadium: game.sport_event.venue.name,
            };
        });

        setMatches(teamsData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table bordered size='sm' className='w-75 mx-auto' variant='dark'>
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
                {matches.map((game, id) => (
                    <MatchesTable
                        key={id}
                        homeTeam={game.homeTeam}
                        awayTeam={game.awayTeam}
                        homeScore={game.homeScore}
                        awayScore={game.awayScore}
                        date={`${game.date.slice(0, 10)} ${game.date.slice(
                            11,
                            16
                        )}`}
                        halfTimeScore={game.halfTimeScore}
                        stadium={game.stadium}
                    />
                ))}
            </tbody>
        </Table>
    );
}

export default App;
