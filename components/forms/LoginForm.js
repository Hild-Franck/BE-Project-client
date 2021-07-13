import React from 'react'
import Button from '@material-ui/core/Button'
import { Field, Form, reduxForm, propTypes } from 'redux-form'

import Input from './../inputs/Input'
import { login, addMessage } from '../../ducks/main'

const LoginForm = ({ handleSubmit, dispatch, closeModal }) => {
  const onSubmit = values => dispatch(login(values)).then(result => {
    localStorage.setItem("user", JSON.stringify(result.body))
    dispatch(addMessage('Logged in !'))
    closeModal()
  })
  return <Form  noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <Field fullWidth label="Username" name="username" component={Input} type="text" />
    <Field fullWidth label="Password" name="password" component={Input} type="password" />
    <Button type="submit">Send</Button>
  </Form>
}

LoginForm.propTypes = { ...propTypes }

export const formName = 'loginForm'

export default reduxForm({ form: formName })(LoginForm)