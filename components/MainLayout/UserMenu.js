import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const UserMenu = ({ anchorEl, menuId, isMenuOpen, handleMenuClose, handleLogout }) => <Menu
  anchorEl={anchorEl}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  id={menuId}
  keepMounted
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={isMenuOpen}
  onClose={handleMenuClose}
>
  <MenuItem onClick={handleLogout}>Logout</MenuItem>
</Menu>

export default UserMenu