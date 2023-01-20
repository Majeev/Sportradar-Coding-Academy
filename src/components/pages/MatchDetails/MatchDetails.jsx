import { useEffect, React, useState } from 'react';
import { useParams } from 'react-router';

function MatchDetails() {
    const params = useParams();
    const [matchData, setMatchData] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await fetch(
                `https://api.sportradar.us/soccer/trial/v4/en/sport_events/${params.id}/timeline.json?api_key=xhe2be3cvt86v6a2s8p98rf3`
            );
            const data = await res.json();

            const {
                sport_event: {
                    start_time,
                    competitors,
                    sport_event_context: { round, season },
                },
                sport_event_status: { home_score, away_score },
            } = data;

            const [home, away] = competitors;

            const matches = {
                home: home.name,
                away: away.name,
                start: start_time,
                round: round.number,
                season: season.name,
                homeScore: home_score,
                awayScore: away_score,
            };

            setMatchData(matches);
            setNews(data.timeline);
        };

        fetchDetails();
    }, []);

    return (
        <div style={{ color: 'white' }}>
            <p>
                {matchData.home} vs {matchData.away}
            </p>
            <p>{matchData.start}</p>
            <p>{matchData.round}</p>
            <p>{matchData.season}</p>
            <p>
                {matchData.homeScore} - {matchData.awayScore}
            </p>
            <div>
                {news.map((news) => (
                    <p key={news.id}>
                        {news.type} {news.time}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default MatchDetails;
