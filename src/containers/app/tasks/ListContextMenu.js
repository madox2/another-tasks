import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import React from 'react'

export default function ListContextMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  function handleActionsClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleActionsClose() {
    setAnchorEl(null)
  }
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="List actions"
        edge="start"
        onClick={handleActionsClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionsClose}
      >
        <ListSubheader>Sort by</ListSubheader>
        <MenuItem onClick={handleActionsClose}>My order</MenuItem>
        <MenuItem onClick={handleActionsClose}>Date</MenuItem>
        <Divider />
        <MenuItem onClick={handleActionsClose}>Rename list</MenuItem>
        <MenuItem onClick={handleActionsClose}>Delete list</MenuItem>
      </Menu>
    </>
  )
}
