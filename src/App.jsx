import { useState, useEffect } from 'react';
import './components/MatchesTable/MatchesTable';
import './App.css';
import MatchesTable from './components/MatchesTable/MatchesTable';

function App() {
    const [matches, setMatches] = useState([]);

    const fetchData = async () => {
        const res = await fetch(
            'https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=xhe2be3cvt86v6a2s8p98rf3'
        );
        const data = await res.json();

        // console.log(data.schedules)

        const teamsData = data.schedules.map((game) => {
            return {
                homeTeam: game.sport_event.competitors[0].name,
                awayTeam: game.sport_event.competitors[1].name,
                homeScore: game.sport_event_status.home_score,
                awayScore: game.sport_event_status.away_score,
                date: game.sport_event.start_time,
                halfTimeScore: game.sport_event_status.status, //right now showing status, having some issues with getting period scores
                // stadium: game.sport_event.venue.name,
                stadium: game.sport_event.sport_event_context.groups[0].name //testing other data due to having issues with period scores
            };
        });

        setMatches(teamsData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {matches.map((game, id) => (
                <MatchesTable
                    key={id}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    homeScore={game.homeScore}
                    awayScore={game.awayScore}
                    date={`${game.date.slice(0,10)} ${game.date.slice(11,16)}`}
                    halfTimeScore={game.halfTimeScore}
                    stadium={game.stadium}
                />
            ))}
        </div>
    );
}

export default App;
