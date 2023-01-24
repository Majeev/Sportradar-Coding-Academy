import React from 'react';
import * as icon from '../../../../icons';
import css from './EventType.module.css';

function EventType({ info }) {
    const icons = {
        score_change: <icon.IoMdFootball />,
        match_started: <icon.VscDebugStart />,
        throw_in: <icon.GiThrowingBall />,
        goal_kick: <icon.GiSoccerKick />,
        free_kick: <icon.GiBarefoot />,
        shot_off_target: <icon.TbTargetOff />,
        shot_on_target: <icon.GiOnTarget />,
        yellow_card: <icon.GiCardPlay />,
        red_card: <icon.GiCardPlay />,
        shot_saved: <icon.GiGoalKeeper />,
        corner_kick: <icon.GiCornerFlag />,
        possible_goal: <icon.VscQuestion />,
        break_start: <icon.BsStopwatch />,
        substitution: <icon.FaExchangeAlt />,
        offside: <icon.FiFlag />,
        match_ended: <icon.FaFlagCheckered />,
        injury: <icon.FaUserInjured />,
        injury_return: <icon.TbTruckReturn />,
        penalty_awarded: <icon.GiWhistle />,
        video_assistant_referee: <icon.FiMonitor />,
        video_assistant_referee_over: <icon.FiMonitor />,
    };

    return (
        <div className='p-2 position-relative d-flex align-items-center text-center separation'>
            <span className={`font-xlarge mx-3 icon ${info.type} `}>
                {icons[info.type]}
            </span>
            <span className='font-medium mx-3'>
                {info.type !== 'score_change'
                    ? info.type
                          .replace(/_/g, ' ')
                          .replace('video assistant referee', 'var')
                          .replace('awarded', '')
                          .toUpperCase()
                    : 'GOAAL!'}
            </span>
            <span
                className={`${css.event__time} font-medium position-absolute end-0 mx-3`}>
                {info.match_clock}
            </span>
        </div>
    );
}

export default EventType;
