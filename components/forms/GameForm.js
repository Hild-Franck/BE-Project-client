import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Field, Form, reduxForm, formValueSelector, propTypes } from 'redux-form'

import Input from './../inputs/Input'
import InputSelect from './../inputs/InputSelect'
import CheckboxInput from './../inputs/CheckboxInput'
import createWebSocket, { ws } from '../../websocket'

const GameForm = ({ handleSubmit, dispatch, closeModal, mode }) => {
  const onSubmit = values => {
    const { token } = JSON.parse(localStorage.getItem('user') || '""')
    createWebSocket(token, dispatch)
    setTimeout(() => {
      ws.send(JSON.stringify({
        type: "CREATE_LOBBY", payload: { ...values }
      }))
      closeModal()
    }, 500)
  }
  const width = mode === 1 ? 12 : 6
  return <Form  noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={3}>
    <Grid item container alignItems="center" spacing={3}>
        <Grid item xs={12}><Field fullWidth label="Game mode" name="mode" component={InputSelect} array={["Normal", "Battle Royale"]} /></Grid>
      </Grid>
      <Grid item container alignItems="center" spacing={3}>
        <Grid item xs={width}><Field fullWidth label="Max players" name="maxPlayers" component={Input} type="number" /></Grid>
        {mode !== 1 && <Grid item xs={6}><Field fullWidth label="Round duration" name="roundDuration" component={Input} type="number" /></Grid>}
      </Grid>
      <Grid item container alignItems="center" spacing={3}>
        {mode !== 1
          ? <Grid item xs={6}><Field fullWidth label="Number of rounds" name="numberOfRounds" component={Input} type="number" /></Grid>
          : <Grid item xs={6}><Field fullWidth label="Number of lives" name="numberOfLives" component={Input} type="number" /></Grid>}
        <Grid item xs={6}><Field fullWidth label="Difficulty" name="difficulty" component={InputSelect} array={[ "Kid", "Easy" ]} /></Grid>
      </Grid>      
      <Grid item container alignItems="center" spacing={3}>
        <Grid item xs={6}><Field fullWidth label="Type" name="type" component={InputSelect} array={[
          "Math - Algebra", "Histoire - Evenements", "Geographie - Drapeaux", "Harry Potter - Sorts"
        ]} /></Grid>
        <Grid item xs={6}><Field fullWidth disabled label="Private" name="private" component={CheckboxInput} type="number" /></Grid>
      </Grid>
      <Button color="primary" variant="contained" type="submit">Create</Button>
    </Grid>
  </Form>
}

GameForm.propTypes = { ...propTypes }

export const formName = 'gameForm'
const selector = formValueSelector(formName)

const form = reduxForm({ form: formName, initialValues: {
  maxPlayers: 10, roundDuration: 10, numberOfRounds: 15, difficulty: 0, type: 0,
  mode: 0, numberOfLives: 3
} })(GameForm)

export default connect(state => ({ mode: selector(state, "mode") }))(form)