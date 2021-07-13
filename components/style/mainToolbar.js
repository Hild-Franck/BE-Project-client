import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  root: {
    backgroundColor: "#00b1ff"
  },
  user: {
    flexGrow: 1,
    textAlign: 'right'
  },
  date: {
    flexGrow: 2,
    textAlign: 'center'
  }
}))

export default useStyles