import { useEffect, React, useState } from 'react';
import { useParams } from 'react-router';
import {
    Navbar,
    Card,
    Backdrop,
    MatchInfo,
    ScrollNavbar,
    Goal,
    EventType,
    EventDetails,
    MatchStatistics,
    Button,
} from '../../components/index';

function MatchDetails() {
    const params = useParams();
    const [apiLoad, setApiLoad] = useState(false);
    const [matchData, setMatchData] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [news, setNews] = useState([]);
    const [showTimeline, setShowTimeline] = useState(false);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(
                    `https://api.sportradar.us/soccer/trial/v4/en/sport_events/${params.id}/timeline.json?api_key=rs46bm6e9ztp55xegwkbgf3m`
                );
                const data = await res.json();
                console.log(data);

                // Match data destructure

                const {
                    sport_event: {
                        start_time,
                        competitors,
                        sport_event_context: { round, season },
                    },
                    sport_event_status: { home_score, away_score },

                    statistics: {
                        totals: { competitors: teams },
                    },
                } = data;

                // Match data assing

                const [home, away] = competitors;
                const matches = {
                    home: home.name,
                    homeAbbreviation: home.abbreviation,
                    awayAbbreviation: away.abbreviation,
                    away: away.name,
                    start: start_time,
                    round: round.number,
                    season: season.name,
                    homeScore: home_score,
                    awayScore: away_score,
                };

                // Match statistics destructure

                const [homeStats, awayStats] = teams;
                const {
                    statistics: {
                        ball_possession: home_possession,
                        shots_total: home_shots,
                        shots_on_target: home_shots_on_target,
                        shots_saved: home_shots_saved,
                        fouls: home_fouls,
                        yellow_cards: home_yellow_cards,
                        red_cards: home_red_cards,
                        corner_kicks: home_corners,
                        throw_ins: home_throw_ins,
                    },
                } = homeStats;

                const {
                    statistics: {
                        ball_possession: away_possession,
                        shots_total: away_shots,
                        shots_on_target: away_shots_on_target,
                        shots_saved: away_shots_saved,
                        fouls: away_fouls,
                        yellow_cards: away_yellow_cards,
                        red_cards: away_red_cards,
                        corner_kicks: away_corners,
                        throw_ins: away_throw_ins,
                    },
                } = awayStats;

                // Match statistics assign

                const stats = {
                    home_possession,
                    away_possession,
                    home_shots,
                    away_shots,
                    home_shots_on_target,
                    away_shots_on_target,
                    home_shots_saved,
                    away_shots_saved,
                    home_fouls,
                    away_fouls,
                    home_yellow_cards,
                    away_yellow_cards,
                    home_red_cards,
                    away_red_cards,
                    home_corners,
                    away_corners,
                    home_throw_ins,
                    away_throw_ins,
                };

                // Setting states

                setMatchData(matches);
                setStatistics(stats);
                setNews(data.timeline);
                setApiLoad(true);
            } catch (error) {
                alert('Match statistics loading error. Please refresh page');
            }
        };

        fetchDetails();
    }, []);

    const toggleTimeline = () => {
        !showTimeline || showStats
            ? (setShowTimeline(true), setShowStats(false))
            : setShowTimeline(false);
    };
    const toggleStats = () => {
        !showStats || showTimeline
            ? (setShowStats(true), setShowTimeline(false))
            : setShowStats(false);
    };

    const unwantedNews = ['period_start', 'period_score', 'injury_time_shown'];

    return (
        apiLoad && (
            <>
                <Navbar data={matchData} />
                <ScrollNavbar data={matchData} />
                <Card className='p-4'>
                    <MatchInfo data={matchData} />
                </Card>
                <Card>
                    <div className={`d-flex w-100 justify-content-around `}>
                        <Button title='Timeline' onClick={toggleTimeline} />
                        <Button title='Statistics' onClick={toggleStats} />
                    </div>
                </Card>
                {showTimeline && (
                    <Card>
                        {news.map(
                            (info) =>
                                !unwantedNews.includes(info.type) && (
                                    <Backdrop
                                        key={info.id}
                                        className={'w-80 my-5 mx-auto'}>
                                        <EventType info={info} />
                                        <EventDetails
                                            info={info}
                                            data={matchData}
                                        />
                                        {info.type === 'score_change' && (
                                            <Goal
                                                info={info}
                                                data={matchData}
                                            />
                                        )}
                                    </Backdrop>
                                )
                        )}
                    </Card>
                )}
                {showStats && (
                    <Card className='p-4'>
                        <Backdrop>
                            <MatchStatistics
                                statistics={statistics}
                                data={matchData}
                            />
                        </Backdrop>
                    </Card>
                )}
            </>
        )
    );
}

export default MatchDetails;
