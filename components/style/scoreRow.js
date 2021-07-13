import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: `${theme.palette.warning.light} !important`
    }
  },
  selected: {
    position: "relative",
    transform: "translate(0px, 0px)"
  },
  reason: {
    position: "absolute",
    left: 5,
    bottom: 2,
    fontStyle: "italic",
    color: theme.palette.error.dark
  }
}))

export default useStyles