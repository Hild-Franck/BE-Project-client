import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: { margin: theme.spacing(1) },
  item: { marginLeft: "auto" },
  lastItem: { marginLeft: 0 },
  root: { padding: 15 }
}))

export default useStyles