import React, { useState } from "react"
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

import Input from './Input'

const InputDate = ({ label, ...props }) => <Input component={props => <MuiPickersUtilsProvider utils={DateFnsUtils}>
  <KeyboardDateTimePicker
    {...props}
    autoOk
    variant="inline"
    margin="normal"
    id="date-picker-inline"
    label={label}
    KeyboardButtonProps={{ 'aria-label': 'change date' }}
  />
</MuiPickersUtilsProvider>} {...props} />

InputDate.propTypes = {
  label: PropTypes.string
}

export default InputDate