import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

import LoginButton from '../buttons/LoginButton'
import useStyles from '../style/mainToolbar'

const MainToolbar = ({ auth, menuId, handleMenuOpen }) => {
  const classes = useStyles()

  return <Toolbar className={classes.root}>
    <Typography variant="h6" className={classes.title} noWrap>
      BE Project
    </Typography>
    {!auth.username
      && <LoginButton />
      || (<div  className={classes.user}>
      <IconButton aria-controls={menuId} aria-haspopup="true" onClick={handleMenuOpen}>
        <AccountCircle />
      </IconButton>
      <span>{auth.username}</span>
      </div>)}
  </Toolbar>
}

MainToolbar.propTypes = {
  auth: PropTypes.object,
  menuId: PropTypes.string,
  handleMenuOpen: PropTypes.func
}

const mapStateToProps = state => state.main

export default connect(mapStateToProps)(MainToolbar)