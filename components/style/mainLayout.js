import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: { display: 'flex' },
  appBar: { zIndex: theme.zIndex.drawer + 1 },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  drawer: {
    width: drawerWidth,
    overflowX: 'hidden',
    flexShrink: 0,
  },
  drawerPaper: menu => ({
    transition: "width .5s",
    width: menu ? (theme.spacing(7) + 1) : drawerWidth
  }),
  drawerContainer: { overflowX: 'hidden' },
  content: menu => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: "margin .5s",
    marginLeft: menu ? (theme.spacing(7) + 1) : drawerWidth
  }),
}))

export default useStyles