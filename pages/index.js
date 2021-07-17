import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'

import { getAllLobbies } from '../ducks/lobby'
import { setData } from '../ducks/modal'
import createWebSocket, { ws } from '../websocket'

const states = {
  "PENDING": <Chip label="Waiting for players" />,
  "STARTING": <Chip color="secondary" label="Starting" />
}

const Index = ({ dispatch, lobbies, username, currentLobby }) => {
  useEffect(() => {
    dispatch(getAllLobbies())
  }, [])

  const handleJoin = id => () => {
    const { token } = JSON.parse(localStorage.getItem('user') || '""')
    createWebSocket(token, dispatch)
    setTimeout(() => {
      ws.send(JSON.stringify({ 
        type: "JOIN_LOBBY", payload: { lobby: id }
      }))
    }, 500)
  }
  const handleCreate = () => {
    dispatch(setData("game", {}))
  }
  const handleRefresh = () => dispatch(getAllLobbies())

  return <div>
    <h1>Home</h1>
    <Button onClick={handleCreate} variant="contained">Create Lobby</Button>
    <Button onClick={handleRefresh} variant="contained" color="primary">Refresh</Button>
    <hr />
    <Grid container wrap="nowrap" spacing={3} direction="column">
      {lobbies.map(l => <Grid key={l.id} alignItems="center" container item>
        <Grid item xs={3}>{l.id == currentLobby
          ? <strong>Math - additions*</strong>
          : "Math - additions"
        }</Grid>
        <Grid item xs={2}>Owner: {l.owner == username ? "You" : l.owner}</Grid>
        <Grid item xs={1}>{l.players ?? "?"} / {l.maxPlayers || "?"}</Grid>
        <Grid item xs={3}>{currentLobby == l.id
          ? <Chip color="primary" label="In lobby" />
          : states[l.state]
        }</Grid>
        <Grid item xs={3}>
          <Button onClick={handleJoin(l.id)} disabled={l.state != "PENDING" || currentLobby} variant="contained">Join</Button>
        </Grid>
      </Grid>)}
    </Grid>
  </div>
}

Index.propTypes = {
  dispatch: PropTypes.func,
  lobbies: PropTypes.array,
  username: PropTypes.string,
  currentLobby: PropTypes.string
}

Index.getInitialProps = ({ lobbies }) => {}

const mapStateToProps = state => ({
  lobbies: state.lobby.data, username: state.main.auth.username,
  currentLobby: state.lobby.currentLobby
 })

export default connect(mapStateToProps)(Index)

