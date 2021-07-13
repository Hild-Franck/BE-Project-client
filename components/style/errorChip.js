import { makeStyles } from '@material-ui/core/styles'

const useStyles = severity => makeStyles(theme => ({
  colorPrimary: {
    backgroundColor: (pal => pal ? pal.dark : severity)(theme.palette[severity])
  },
  label: {
    paddingRight: 0
  },
  icon: {
    marginLeft: 4,
    marginRight: -8
  }
}))

export default useStyles
