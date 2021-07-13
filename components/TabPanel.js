import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const TabPanel = ({ children, value, index, ...props }) =>
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...props}
  >
    {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>

TabPanel.propTypes = {
  children: PropTypes.array,
  value: PropTypes.number,
  index: PropTypes.number
}

export default TabPanel