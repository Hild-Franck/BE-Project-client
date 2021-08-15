import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import { ws } from '../websocket'
import PlayerCard from '../components/PlayerCard'
import StopWatch from '../components/StopWatch'

const Game = ({ currentLobby, game, players, lobbies, username }) => {
  const [answer, setAnswer] = useState("")
  const handleChange = e => setAnswer(e.target.value)
  const handleGameStart = () => {
    ws.send(JSON.stringify({
      type: "START_GAME",
      payload: {
        lobby: currentLobby,
        type: 1
      }
    }))
  }
  const handleAnswer = e => {
    e.preventDefault()
    ws.send(JSON.stringify({
      type: "ANSWER_GAME", payload: { level: game.level, answer, lobby: currentLobby }
    }))
    setAnswer("")
  }

  const lobby = lobbies.find(l => l.id == currentLobby)
  const proposition = game.proposition ? game.proposition.split("\n") : []
  const answered = players[username]?.currentAnswer != "pending"
  
  return <div>
    <h1>Game</h1>
    <h2>Lobby {currentLobby}</h2>
    {lobby.owner == username  && <Button variant="contained" onClick={handleGameStart}>
      Start Game
    </Button>}
    <Grid container justify="center">
      {lobby.mode == "br"
        ? Object.keys(players).sort((a, b) => players[b].lives - players[a].lives).map(p => <PlayerCard player={p} score={players[p].score} lives={players[p].lives} state={players[p].currentAnswer} mode={lobby.mode} key={p} />)
        : Object.keys(players).sort((a, b) => players[b].score - players[a].score).map(p => <PlayerCard player={p} score={players[p].score} lives={players[p].lives} state={players[p].currentAnswer} mode={lobby.mode} key={p} />)
      }
    </Grid>
    {game.level ? <Grid direction="column" container alignItems="center">
      <Grid item><StopWatch end={game.end} /></Grid>
      <Grid item><h1>Round {game.level}</h1></Grid>
      {game.answer
        ? <Grid item>
          <Typography align="center" variant="h3">Reponse:</Typography>
          <Typography align="center" variant="h4">{game.answer}</Typography>
        </Grid>
        : <Grid item>{proposition.map((p, i) => {
            return i === 0
              ? p.match(/\.png$/)
                ? <img src={p} style={{ minWidth: 128 }} />
                : <Typography align="center" variant="h4">{p}</Typography>
              : <Typography align="center" variant="h5">[{p}]</Typography>
          })}
        </Grid>
      }
      {!game.answer && <Grid item><form onSubmit={handleAnswer}><Grid container direction="row" alignItems="center">
        <Grid item><TextField disabled={answered} autoFocus value={answer} onChange={handleChange} placeholder="Answer:" variant="outlined" /></Grid>
        <Grid item><Button disabled={answered} size="large" variant="contained" color="primary" type="submit">Send</Button></Grid>
      </Grid></form></Grid>}
    </Grid> : ""}
  </div>
}

Game.propTypes = {
  lobbies: PropTypes.array,
  game: PropTypes.any,
  players: PropTypes.any,
  username: PropTypes.string,
  currentLobby: PropTypes.string
}

Game.getInitialProps = () => {}

const mapStateToProps = state => ({
  username: state.main.auth.username, currentLobby: state.lobby.currentLobby,
  game: state.game, players: state.lobby.players, lobbies: state.lobby.data
})

export default connect(mapStateToProps)(Game)