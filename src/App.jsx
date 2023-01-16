import { useState, useEffect } from 'react';
import './components/TableBody/TableBody';
import './App.css';
import TableBody from './components/TableBody/TableBody';
import TableHeaders from './components/TableHeaders/TableHeaders';

function App() {
    const [matches, setMatches] = useState([]);

    const fetchData = async () => {
        const res = await fetch(
            'https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=xhe2be3cvt86v6a2s8p98rf3'
        );
        const data = await res.json();

        const teamsData = data.schedules.map((game) => {
            const {
                sport_event: { competitors, start_time, venue },

                sport_event_status: { home_score, away_score, period_scores },
            } = game;

            const [homeTeam, awayTeam] = competitors;

            return {
                homeTeam: homeTeam.name,
                awayTeam: awayTeam.name,
                homeScore: home_score,
                awayScore: away_score,
                date: start_time,
                homeHalfScore: period_scores
                    ? period_scores[0].home_score
                    : null,
                awayHalfScore: period_scores
                    ? period_scores[0].away_score
                    : null,
                stadium: venue.name,
            };
        });

        setMatches(teamsData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <TableHeaders>
            {matches.map((game, id) => (
                <TableBody
                    key={id}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    homeScore={game.homeScore}
                    awayScore={game.awayScore}
                    date={`${game.date.slice(0, 10)} ${game.date.slice(
                        11,
                        16
                    )}`}
                    homeHalfScore={game.homeHalfScore}
                    awayHalfScore={game.awayHalfScore}
                    stadium={game.stadium}
                />
            ))}
        </TableHeaders>
    );
}

export default App;
