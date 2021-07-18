import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'

let interval = null

const setTimer = (end, setTime) => {
  const now = Date.now()
  const difference = end - now
  const timeLeft = difference < 0
    ? 0
    : Math.floor((difference / 1000))
  setTime(timeLeft)
}

const StopWatch = ({ end=0 }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    clearInterval(interval)
    setTimer(end, setTime)
    interval = setInterval(() => {
      setTimer(end, setTime)
    }, 1000)
  }, [end])

  return <div>
    <Typography variant="h3">{time}</Typography>
  </div>
}

export default StopWatch