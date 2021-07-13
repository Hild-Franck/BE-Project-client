import React from 'react'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const Filter = ({ filters, object, onChange, label, ...props }) => {
  const key = Object.keys(object)[0]
  const haveFilter = key in filters
  const handleFilter = e => !haveFilter
    ? onChange(e, { ...filters, ...object })
    : onChange(e, (({[key]:_, ...rest}) => rest)(filters))

  return <FormControlLabel
    label={label}
    control={
      <Switch
        {...props}
        checked={haveFilter}
        color="primary"
        onClick={e => e.stopPropagation()}
        onChange={handleFilter}
      />
    }
  />
}

Filter.propTypes = {
  filters: PropTypes.object,
  object: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string
}

export default Filter