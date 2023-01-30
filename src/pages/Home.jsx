import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TableContent,
    TableHeaders,
    SeasonsDropdown,
    SeasonsOption,
    Header,
    Loading,
} from '../components/index';
import Container from 'react-bootstrap/Container';
import { useGetAllSeasonsQuery, useGetSeasonQuery } from '../services/services';

function Home() {
    const [season, setSeason] = useState({
        id: 'sr:season:77453',
        title: 'Ekstraklasa 20/21',
    });

    const {
        data: allData,
        error: allError,
        isLoading: areLoading,
    } = useGetAllSeasonsQuery();
    const { data, error, isLoading } = useGetSeasonQuery(season.id);

    const handleChange = (option) => {
        setSeason(option);
    };

    const navigate = useNavigate();

    if (error || allError) {
        if (error.status === 404 || allError.status === 400) {
            navigate('/*');
        } else {
            alert('Error. Please refresh the page');
        }
    }

    if (isLoading || areLoading) {
        return <Loading />;
    }

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
            homeHalfScore: period_scores ? period_scores[0].home_score : null,
            awayHalfScore: period_scores ? period_scores[0].away_score : null,
            stadium: venue.name,
            status: status,
        };
    });

    const { seasons } = allData;

    return (
        <>
            <Header title={season.title} />
            <Container
                fluid='lg'
                className='font-medium text-center p-0 box-shadow-58'>
                <SeasonsDropdown onChange={handleChange}>
                    {seasons.map((season) => (
                        <SeasonsOption
                            name={season.name}
                            id={season.id}
                            key={season.id}
                        />
                    ))}
                </SeasonsDropdown>
                <TableHeaders>
                    {teamsData.map((game) => (
                        <TableContent key={game.id} data={game} />
                    ))}
                </TableHeaders>
            </Container>
        </>
    );
}

export default Home;
