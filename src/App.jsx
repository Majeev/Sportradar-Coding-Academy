import { useState, useEffect } from 'react';
import './components/TableBody/TableBody';
import './App.css';
import TableBody from './components/TableBody/TableBody';
import TableHeaders from './components/TableHeaders/TableHeaders';
import SeasonsDropdown from './components/SeasonsDropdown/SeasonsDropdown';
import SeasonsItems from './components/SeasonsItems/SeasonsItems';
import Container from 'react-bootstrap/Container';

function App() {
    const [seasonId, setSeasonId] = useState('sr:season:77453');
    const [matches, setMatches] = useState([]);
    const [allSeasons, setAllSeasons] = useState([]);

    //Data Fetch

    const fetchData = async () => {
        const [resMatches, resSeasons] = await Promise.all([
            fetch(
                `https://api.sportradar.us/soccer/trial/v4/en/seasons/${seasonId}/schedules.json?api_key=xhe2be3cvt86v6a2s8p98rf3`
            ),
            fetch(
                'https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=xhe2be3cvt86v6a2s8p98rf3'
            ),
        ]);

        const dataMatches = await resMatches.json();
        const dataSeasons = await resSeasons.json();

        setAllSeasons(dataSeasons.seasons);

        // Mapping and destructuring matches data
        const teamsData = dataMatches.schedules.map((game) => {
            const {
                sport_event: { competitors, start_time, venue },

                sport_event_status: {
                    home_score,
                    away_score,
                    period_scores,
                    status,
                },
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
                status: status,
            };
        });

        setMatches(teamsData);
    };

    //UseEffects

    //Triggers every time user picks another season from dropdown
    useEffect(() => {
        fetchData();
    }, [seasonId]);

    //onEvent functions

    const handleSelect = (value) => {
        setSeasonId(value);
    };

    return (
        <Container fluid='lg'>
            <SeasonsDropdown onSelect={handleSelect}>
                {allSeasons.map((season) => (
                    <SeasonsItems
                        name={season.name}
                        id={season.id}
                        key={season.id}
                    />
                ))}
            </SeasonsDropdown>
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
                        status={game.status}
                    />
                ))}
            </TableHeaders>
        </Container>
    );
}

export default App;
