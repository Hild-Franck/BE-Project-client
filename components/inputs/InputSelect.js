import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Input from "./Input"

const InputSelect = ({ array, label, fullWidth, ...props }) => <FormControl fullWidth={fullWidth}>
  <InputLabel id="demo-simple-select-label">{label}</InputLabel>

  <Input
    labelId="input-select"
    id="input-select"
    component={Select}
    {...props}
  >
    {array.map(value => <MenuItem key={value} value={value}>
      {value}
    </MenuItem>)}
  </Input>
</FormControl>

InputSelect.propTypes = {
  array: PropTypes.array,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
}

export default InputSelect