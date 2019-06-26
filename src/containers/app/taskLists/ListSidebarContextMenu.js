import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'

import DeleteListDialog from './DeleteListDialog'
import RenameListDialog from './RenameListDialog'

const ListSidebarContextMenu = ({ anchorEl, handleActionsClose, list }) => {
  const [renameOpen, setRenameOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionsClose}
      >
        <div>
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
        </div>
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

export default ListSidebarContextMenu
