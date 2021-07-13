import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

const states = {
	pending: "white",
	right: "green",
	wrong: "red"
}

const useStyles = makeStyles({
	// style rule
	root: ({state}) => ({
		backgroundColor: states[state],
	})
})

const PlayerCard = ({ state, player, score, ...props }) => {
	const classes = useStyles({state})

	return <Card className={classes.root} {...props}>
		<CardContent>
			<Grid container spacing={2} direction="column" justify="center" alignItems="center">
				<p>{player}</p>
				<p>{score}</p>
			</Grid>
		</CardContent>
	</Card>
}

PlayerCard.propTypes = {
	state: PropTypes.string,
	player: PropTypes.any,
	score: PropTypes.number
}

export default PlayerCard