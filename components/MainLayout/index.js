import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import UserMenu from './UserMenu'
import MainToolbar from './MainToolbar'
import NavMenu from './NavMenu'
import { logout, removeMessage, setUser } from '../../ducks/main'
import useStyles from '../style/mainLayout'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const MainLayout = ({ children, dispatch, notification, auth }) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [ menu, setMenu ] = React.useState(true)
  
  const classes = useStyles(menu)

  const onSnackbarClose = () => {
    setOpenSnackbar(false)
    dispatch(removeMessage())
  }

  const handleMenuOpen = ({ currentTarget }) => setAnchorEl(currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(logout())
  }

  const menuId = 'primary-search-account-menu'

  if (!openSnackbar && notification.message) setOpenSnackbar(true)
  
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '""')
      if (!auth.username && user) dispatch(setUser(user.username))
    } catch (e) {
      localStorage.removeItem('user')
      dispatch(setUser(null))
    }
  }, [])
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      {(({ message, severity }) => message &&
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={onSnackbarClose}>
          <Alert onClose={onSnackbarClose} severity={severity}>{message}</Alert>
        </Snackbar>
      )(notification)}
      <AppBar position="fixed" className={classes.appBar}>
        <MainToolbar
          menuId={menuId}
          handleMenuOpen={handleMenuOpen}
        />
      </AppBar>
      <UserMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        handleLogout={handleLogout}
      />
      <NavMenu menu={menu} setMenu={setMenu} />
      <main menu={menu} className={classes.content}>
        {children}
      </main>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.array,
  dispatch: PropTypes.func,
  notification: PropTypes.object,
  auth: PropTypes.object
}

const mapStateToProps = state => state.main

export default connect(mapStateToProps)(MainLayout)