import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const ArrayFields = ({ fields, button="Add", inputComponent, label, xs=3, direction="row", ...props }) =>
  <Grid item container spacing={3}>
    <Grid item>
<Button color="primary" startIcon={<AddIcon />} onClick={() => fields.push("")}>{button}</Button>
    </Grid>
    <Grid item container spacing={3} direction={direction}>
      {fields && fields.map((field, index) => <Grid key={field} item xs={xs}>
        <Field
          {...props}
          name={`${field}`}
          component={inputComponent}
          label={label.constructor === Function ? label(index) : label}
        />
      </Grid>)}
    </Grid>
  </Grid>

ArrayFields.propTypes = {
  fields: PropTypes.array,
  inputComponent: PropTypes.node,
  xs: PropTypes.number,
  direction: PropTypes.string,
  button: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ])
}

export default ArrayFields