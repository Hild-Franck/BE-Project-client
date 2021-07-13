import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Field, Form, reduxForm, propTypes } from 'redux-form'

import { createUser } from '../../ducks/user'
import Input from './../inputs/Input'

const UserForm = ({ handleSubmit, dispatch, closeModal }) =>
  <Form onSubmit={handleSubmit(values => (dispatch(createUser(values)), closeModal()))}>
    <Field label="Username" name="username" component={Input} type="text" />
    <Field label="Email" name="email" component={Input} type="email" />
    <Field label="Password" name="password" component={Input} type="password" />
    <Button color="primary" type="submit">Send</Button>
  </Form>

UserForm.propTypes = {
  ...propTypes,
  dispatch: PropTypes.func,
  closeModal: PropTypes.func
}

export const formName = 'userForm'

export default connect(null)(reduxForm({ form: formName })(UserForm))