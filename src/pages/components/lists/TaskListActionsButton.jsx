import { IconButton, MenuItem, Menu } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useRef, useState } from 'react'

import { TaskListMutationDialog } from '../dialog/TaskListMuationDialog'
import { useEditListMutation } from '../../../app/api/tasks'

export function TaskListsActionButton({ list }) {
  const menuAnchor = useRef()
  const [open, setOpen] = useState(false)
  const editListMutation = useEditListMutation()
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const closeMenu = () => setOpen(false)
  return (
    <>
      <IconButton ref={menuAnchor} onClick={() => setOpen(true)}>
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={menuAnchor.current}
        open={open}
        onClose={closeMenu}
        PaperProps={{ style: { width: '14ch' } }}
      >
        <MenuItem
          onClick={() => {
            closeMenu()
            setRenameDialogOpen(true)
          }}
        >
          Rename
        </MenuItem>
        <MenuItem onClick={closeMenu}>Delete</MenuItem>
      </Menu>
      {renameDialogOpen && (
        <TaskListMutationDialog
          onClose={() => setRenameDialogOpen(false)}
          actionTitle="Rename"
          title="Rename list"
          disabled={editListMutation.isLoading}
          defaultValue={list.title}
          onAction={async title => {
            await editListMutation.mutateAsync({ title, listId: list.id })
            setRenameDialogOpen(false)
          }}
        />
      )}
    </>
  )
}
