import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import React from 'react'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function TaskLists() {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)
  function handleActionsClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleActionsClose() {
    setAnchorEl(null)
  }
  return (
    <List>
      <ListSubheader>Task lists</ListSubheader>
      {['TODO', 'Tomorrow', 'Tmp', 'Work'].map((text, index) => (
        <ListItem button key={text} selected={index === 0}>
          <ListItemText primary={text} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="Comments"
              onClick={handleActionsClick}
            >
              <MoreIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <Fab
        variant="extended"
        aria-label="Create"
        size="small"
        className={classes.fab}
        color="primary"
      >
        <AddIcon className={classes.extendedIcon} />
        Add list
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionsClose}
      >
        <MenuItem onClick={handleActionsClose}>Rename list</MenuItem>
        <MenuItem onClick={handleActionsClose}>Delete list</MenuItem>
      </Menu>
    </List>
  )
}
