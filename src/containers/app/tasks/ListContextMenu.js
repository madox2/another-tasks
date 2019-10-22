import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import React from 'react'
import RefreshIcon from '@material-ui/icons/Refresh'

import { Divider } from '../../../components/Divider'
import DeleteListDialog from '../taskLists/DeleteListDialog'
import RenameListDialog from '../taskLists/RenameListDialog'

export default function ListContextMenu({ list, onRefresh }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [renameOpen, setRenameOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
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
        aria-label="Refresh"
        edge="start"
        onClick={onRefresh}
      >
        <RefreshIcon />
      </IconButton>
      <Divider size={18} horizontal />
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
        {/**
        <ListSubheader>Sort by</ListSubheader>
        <MenuItem onClick={handleActionsClose}>My order</MenuItem>
        <MenuItem onClick={handleActionsClose}>Date</MenuItem>
        <Divider />
          **/}
        <MenuItem
          onClick={() => {
            setRenameOpen(true)
            handleActionsClose()
          }}
        >
          Rename list
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteOpen(true)
            handleActionsClose()
          }}
        >
          Delete list
        </MenuItem>
      </Menu>
      <RenameListDialog
        list={list}
        open={renameOpen}
        onClose={() => {
          setRenameOpen(false)
          handleActionsClose()
        }}
      />
      <DeleteListDialog
        list={list}
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false)
          handleActionsClose()
        }}
      />
    </>
  )
}
