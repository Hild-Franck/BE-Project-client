import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import LayersIcon from '@material-ui/icons/Layers'
import MenuIcon from '@material-ui/icons/Menu'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'

import ButtonLink from '../ButtonLink'
import useStyles from '../style/mainLayout'
import { MenuOpen } from '@material-ui/icons'

const NavMenu = ({ auth, menu, setMenu, currentLobby }) => {
  const classes = useStyles(menu)

  return <Drawer
    variant="permanent"
    classes={{ paper: classes.drawerPaper, drawer: classes.drawer }}
    menu={menu}
  >
    <Toolbar />
    <div className={classes.drawerContainer}>
      <List>
        <ListItem button key="Menu" onClick={() => setMenu(!menu)}>
          <ListItemIcon>
            {menu ? <MenuIcon /> : <MenuOpen />}
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Home" component={ButtonLink} href="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {currentLobby && <ListItem button key="Game" component={ButtonLink} href="/game">
          <ListItemIcon><SportsEsportsIcon /></ListItemIcon>
          <ListItemText primary="Game" />
        </ListItem>}
      </List>
    </div>
  </Drawer>
}

NavMenu.propTypes = {
  auth: PropTypes.object
}

const mapStateToProps = state => ({ ...state.main, currentLobby: state.lobby.currentLobby })

export default connect(mapStateToProps)(NavMenu)