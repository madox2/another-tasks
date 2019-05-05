import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import RefreshIcon from '@material-ui/icons/Refresh'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

export default function ActionList() {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <RefreshIcon />
        </ListItemIcon>
        <ListItemText primary="Refresh" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <VisibilityOffIcon />
        </ListItemIcon>
        <ListItemText primary="Clear Completed" />
      </ListItem>
    </List>
  )
}
