import { useEffect, React, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {
    Navbar,
    Card,
    Backdrop,
    MatchInfo,
    AltNavbar,
    Goal,
    EventType,
    EventDetails,
    MatchStatistics,
    Button,
} from '../components/index';

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

                setNews(data.timeline);

                if (!res.ok) {
                    throw new Error(res.status);
                }

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

                const [home, away] = competitors;

                // Match data assing

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

                setMatchData(matches);

                // Match statistics assign

                const [homeStats, awayStats] = teams;

                const stats = {
                    home_possession: homeStats.statistics.ball_possession,
                    away_possession: awayStats.statistics.ball_possession,
                    home_shots: homeStats.statistics.shots_total,
                    away_shots: awayStats.statistics.shots_total,
                    home_on_target: homeStats.statistics.shots_on_target,
                    away_on_target: awayStats.statistics.shots_on_target,
                    home_saved: homeStats.statistics.shots_saved,
                    away_saved: awayStats.statistics.shots_saved,
                    home_fouls: homeStats.statistics.fouls,
                    away_fouls: awayStats.statistics.fouls,
                    home_yellow_cards: homeStats.statistics.yellow_cards,
                    away_yellow_cards: awayStats.statistics.yellow_cards,
                    home_red_cards: homeStats.statistics.red_cards,
                    away_red_cards: awayStats.statistics.red_cards,
                    home_corners: homeStats.statistics.corner_kicks,
                    away_corners: awayStats.statistics.corner_kicks,
                    home_throw_ins: homeStats.statistics.throw_ins,
                    away_throw_ins: awayStats.statistics.throw_ins,
                };

                setStatistics(stats);

                setApiLoad(true);
            } catch (err) {
                if (err.message === '404') {
                    navigate('/*');
                } else if (err.message === '403') {
                    alert('Data fetch error. Please Refresh the page');
                } else if (err.message === '500') {
                    alert('Internal Server Error, please try again later');
                } else {
                    alert(
                        'Server burned down (or CORS Policy is blocking request again'
                    );
                }
            }
        };

        fetchDetails();
    }, []);

    const navigate = useNavigate();

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
                <AltNavbar data={matchData} />
                <Card className='p-4'>
                    <MatchInfo data={matchData} />
                </Card>
                <Card>
                    <div className={`d-flex w-100 justify-content-around `}>
                        <Button
                            title='Timeline'
                            onClick={toggleTimeline}
                            className={showTimeline && 'active'}
                        />
                        <Button
                            title='Statistics'
                            onClick={toggleStats}
                            className={showStats && 'active'}
                        />
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
