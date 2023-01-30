import { React, useState } from 'react';
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
    Loading,
} from '../components/index';

import { useGetMatchQuery } from '../services/services';

function MatchDetails() {
    const params = useParams();
    const { data, error, isLoading } = useGetMatchQuery(params.id);
    const [showTimeline, setShowTimeline] = useState(false);
    const [showStats, setShowStats] = useState(false);
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

    if (error) {
        if (error.status === 404) {
            navigate('/*');
        } else {
            alert('Error. Please refresh the page');
        }
    }

    if (isLoading) {
        return <Loading />;
    }

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

    return (
        <>
            <Navbar data={matches} />
            <AltNavbar data={matches} />
            <Card className='p-4'>
                <MatchInfo data={matches} />
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
                    {data.timeline.map(
                        (info) =>
                            !unwantedNews.includes(info.type) && (
                                <Backdrop
                                    key={info.id}
                                    className={'w-80 my-5 mx-auto'}>
                                    <EventType info={info} />
                                    <EventDetails info={info} data={matches} />
                                    {info.type === 'score_change' && (
                                        <Goal info={info} data={matches} />
                                    )}
                                </Backdrop>
                            )
                    )}
                </Card>
            )}
            {showStats && (
                <Card className='p-4'>
                    <Backdrop>
                        <MatchStatistics statistics={stats} data={matches} />
                    </Backdrop>
                </Card>
            )}
        </>
    );
}

export default MatchDetails;
