import React from 'react'

function MatchesTable({homeTeam, awayTeam, homeScore, awayScore}) {
  return (
    <div>
        <p>{homeTeam}</p>
        <p>{awayTeam}</p>
        <p>{homeScore}</p>
        <p>{awayScore}</p>
    </div>
  )
}

export default MatchesTable