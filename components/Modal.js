import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'

import useStyles from './style/scoreDetailsModal'
import { close } from '../ducks/modal'
import LoginForm from './forms/LoginForm'
import GameForm from './forms/GameForm'

const modalType = {
  login: LoginForm,
  game: GameForm
}


const SimpleModal = ({ modal, dispatch }) => {
  const classes = useStyles()

  const closeModal = () => dispatch(close())

  const Component = modalType[modal.type]
  
  return <Modal
    className={classes.root}
    open={Boolean(modal.data)}
    onClose={closeModal}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <Paper className={classes.paper}>
      <h1>{modal.type.slice(0,1).toUpperCase()+modal.type.slice(1)}</h1>
      {modal.data &&
        <Component data={modal.data} closeModal={closeModal} />
      }
    </Paper>
  </Modal>
}

SimpleModal.propTypes = {
  modal: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({ modal: state.modal })

export default connect(mapStateToProps)(SimpleModal)