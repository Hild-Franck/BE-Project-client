import React from 'react'
import { reduxForm } from 'redux-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const CheckboxInput = ({ input, label, disabled }) => (
	<div>
		<FormControlLabel
			control={
				<Checkbox
					checked={input.value ? true : false}
					onChange={input.onChange}
					disabled={disabled}
sss				/>
			}
			label={label}
		/>
	</div>
)

CheckboxInput.propTypes = { ...reduxForm.propTypes }

export default CheckboxInput