import { useState, useEffect } from 'react';
import {
    TableContent,
    TableHeaders,
    SeasonsDropdown,
    SeasonsOption,
    Header,
} from '../components/index';
import Container from 'react-bootstrap/Container';

function Home() {
    const [season, setSeason] = useState({
        id: 'sr:season:77453',
        title: 'Ekstraklasa 20/21',
    });
    const [matches, setMatches] = useState([]);
    const [allSeasons, setAllSeasons] = useState([]);
    const [isLoaded, setIsLoaded] = useState([]);

    //Data Fetch
    //Triggers every time user picks another season from dropdown

    useEffect(() => {
        const fetchSeason = async () => {
            try {
                const res = await fetch(
                    `https://api.sportradar.us/soccer/trial/v4/en/seasons/${season.id}/schedules.json?api_key=2p8d96jgxym9u422zy5rnhjp`
                );
                const data = await res.json();

                // Mapping and destructuring matches data
                const teamsData = data.schedules.map((game) => {
                    const {
                        sport_event: { id, competitors, start_time, venue },

                        sport_event_status: {
                            home_score,
                            away_score,
                            period_scores,
                            status,
                        },
                    } = game;

                    const [homeTeam, awayTeam] = competitors;

                    return {
                        id: id,
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
                setIsLoaded((prevState) => [...prevState, true]);
            } catch (error) {
                alert(
                    'Scoreboard loading error occurred. Please refresh the page'
                );
                setIsLoaded((prevState) => [...prevState, false]);
            }
        };

        fetchSeason();
    }, [season]);

    //Seasons dropdown fetch, only once on component render
    useEffect(() => {
        const fetchAllSeasons = async () => {
            try {
                const res = await fetch(
                    'https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=2p8d96jgxym9u422zy5rnhjp'
                );
                const data = await res.json();

                setAllSeasons(data.seasons);
                setIsLoaded((prevState) => [...prevState, true]);
            } catch (error) {
                alert(
                    'Seasons dropdown loading error occurred. Please refresh the page'
                );
                setIsLoaded((prevState) => [...prevState, false]);
            }
        };

        fetchAllSeasons();
    }, []);

    //onEvent functions

    const handleChange = (option) => {
        setSeason(option);
    };

    console.log(isLoaded);
    return (
        !isLoaded.includes(false) && (
            <>
                <Header title={season.title} />
                <Container
                    fluid='lg'
                    className='font-medium text-center p-0 box-shadow-58'>
                    <SeasonsDropdown onChange={handleChange}>
                        {allSeasons.map((season) => (
                            <SeasonsOption
                                name={season.name}
                                id={season.id}
                                key={season.id}
                            />
                        ))}
                    </SeasonsDropdown>
                    <TableHeaders>
                        {matches.map((game) => (
                            <TableContent key={game.id} data={game} />
                        ))}
                    </TableHeaders>
                </Container>
            </>
        )
    );
}

export default Home;
