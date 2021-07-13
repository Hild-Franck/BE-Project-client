import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'
import { filter, countBy, map } from "lodash"

import { formatDate } from '../utils'

const Alert = props => <MuiAlert elevation={6} {...props} />

const SortAlert = ({ teams, date }) => {
  const unverified = filter(teams, team => (formatDate(team.date) == date) && (team.validationState !== "verified"))
  const errors = countBy(unverified.map(u => u.errorFlags).flat())
  return unverified.length > 0
    ? <div>
        <Alert severity="warning">You have {unverified.length} team(s) left to verify</Alert>
        {map(errors, (count, error) => <Alert severity="error">{count} team(s) have `{error}` error</Alert>)}
      </div>
    : <Alert severity="success">All team verified !</Alert>
}

SortAlert.propTypes = {
  teams: PropTypes.object,
  date: PropTypes.string
}

const mapStateToProps = state => ({ teams: state.team.data })

export default connect(mapStateToProps)(SortAlert)