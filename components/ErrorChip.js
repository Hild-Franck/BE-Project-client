import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import useStylesFactory from './style/errorChip'

const types = {
  error: { icon: ErrorIcon, severity: "error" },
  warning: { icon: ErrorIcon, severity: "black" },
  verified: { icon: CheckCircleIcon, severity: "success" },
  unverified: { icon: ErrorIcon, severity: "error" }
}

const ErrorChip = ({ state }) => {
  const type = types[state||"unverified"]

  const useStyles = useStylesFactory(type.severity)
  const classes = useStyles()

  const Icon = type.icon
  return <Chip
    classes={classes}
    icon={<Icon />}
    label=""
    color="primary"
  >
  </Chip>
}

ErrorChip.propTypes = {
  state: PropTypes.string
}

export default ErrorChip