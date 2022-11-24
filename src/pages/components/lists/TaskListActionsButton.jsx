import { IconButton, MenuItem, Menu } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef, useState } from 'react'

import { TaskListDeleteDialog } from '../dialog/TaskListDeleteDialog'
import { TaskListMutationDialog } from '../dialog/TaskListMuationDialog'
import { taskListPath } from '../../../app/routes'
import {
  useDeleteListMutation,
  useEditListMutation,
} from '../../../app/api/tasks'

export function TaskListsActionButton({ list, lists }) {
  const { listId: currentListId } = useParams()
  const navigate = useNavigate()
  const menuAnchor = useRef()
  const [open, setOpen] = useState(false)
  const editListMutation = useEditListMutation()
  const deleteListMutation = useDeleteListMutation()
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
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
        <MenuItem
          onClick={() => {
            closeMenu()
            setDeleteDialogOpen(true)
          }}
        >
          Delete
        </MenuItem>
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
      {deleteDialogOpen && (
        <TaskListDeleteDialog
          onClose={() => setDeleteDialogOpen(false)}
          disabled={deleteListMutation.isLoading}
          listTitle={list.title}
          onDelete={async title => {
            await deleteListMutation.mutateAsync({ listId: list.id })
            setDeleteDialogOpen(false)
            if (currentListId === list.id) {
              // navigate elsewhere
              const nextList = lists.find(({ id }) => id !== list.id)
              navigate(taskListPath(nextList.id))
            }
          }}
        />
      )}
    </>
  )
}
