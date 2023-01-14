import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [matches, setMatches] = useState([]);

    const fetchData = async () => {
        const res = await fetch(
            'https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=xhe2be3cvt86v6a2s8p98rf3'
        );
        const data = await res.json();

        const teamsData = data.schedules.map(game => {
            return {
                homeTeam: game.sport_event.competitors[0].name,
                awayTeam: game.sport_event.competitors[1].name,
                homeScore: game.sport_event_status.home_score,
                awayScore: game.sport_event_status.away_score
            }
        })

        setMatches(teamsData);
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <div>
            {match.map((game, id) => (
                <div key={id}>
                    {game.homeTeam} vs{' '}
                    {game.awayScore} wynik{' '}
                    {game.homeScore} -{' '}
                    {game.awayScore}
                </div>
            ))}
        </div>
    );
}

export default App;
