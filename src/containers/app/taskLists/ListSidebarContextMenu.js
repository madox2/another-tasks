import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'

import { DELETE_LIST, EDIT_LIST } from '../../../queries/taskMutations'
import { LoadableMutation } from '../common/LoadableMutation'
import { MINIMAL_TASK_LISTS } from '../../../queries/taskListsQueries'

const ListSidebarContextMenu = ({ anchorEl, handleActionsClose, list }) => {
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false)
  const [title, setTitle] = React.useState(list.title)
  useEffect(() => {
    setTitle(list && list.title)
    // eslint-disable-next-line
  }, [list && list.id])

  function openRenameDialog() {
    handleActionsClose()
    setRenameDialogOpen(true)
  }

  function closeRenameDialog() {
    setRenameDialogOpen(false)
  }
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionsClose}
      >
        <div>
          <LoadableMutation mutation={EDIT_LIST}>
            {(editList, { data }) => {
              return <MenuItem onClick={openRenameDialog}>Rename list</MenuItem>
            }}
          </LoadableMutation>

          <LoadableMutation mutation={DELETE_LIST}>
            {(deleteList, { data }) => {
              return (
                <MenuItem
                  onClick={() => {
                    deleteList({
                      variables: { listId: list.id },
                      refetchQueries: [{ query: MINIMAL_TASK_LISTS }],
                      awaitRefetchQueries: true,
                    })
                    handleActionsClose()
                  }}
                >
                  Delete list
                </MenuItem>
              )
            }}
          </LoadableMutation>
        </div>
      </Menu>
      <Dialog
        open={renameDialogOpen}
        onClose={closeRenameDialog}
        aria-labelledby="form-dialog-title"
      >
        <LoadableMutation mutation={EDIT_LIST}>
          {(editList, { data }) => (
            <>
              <DialogTitle id="form-dialog-title">List</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="List Name"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={closeRenameDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    editList({
                      variables: { listId: list.id, title },
                      refetchQueries: [{ query: MINIMAL_TASK_LISTS }],
                      awaitRefetchQueries: true,
                    })
                    closeRenameDialog()
                  }}
                  color="primary"
                >
                  Edit
                </Button>
              </DialogActions>
            </>
          )}
        </LoadableMutation>
      </Dialog>
    </>
  )
}

export default ListSidebarContextMenu
