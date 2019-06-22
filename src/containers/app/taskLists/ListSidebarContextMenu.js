import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'

import { TASK_LISTS } from '../Sidebar'

const DELETE_LIST = gql`
  mutation DeleteList($listId: String!) {
    deleteList(listId: $listId)
  }
`

const EDIT_LIST = gql`
  mutation EditList($listId: String!, $title: String) {
    editList(listId: $listId)
  }
`

const ListSidebarContextMenu = ({ anchorEl, handleActionsClose, list }) => {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState(list.title)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleCancel() {
    setOpen(false)
  }
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleActionsClose}
    >
      <Mutation mutation={EDIT_LIST}>
        {(editList, { data }) => {
          return (
            <>
              <MenuItem onClick={handleClickOpen}>Rename list</MenuItem>
              <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="form-dialog-title"
              >
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
                  <Button onClick={handleCancel} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      editList({
                        variables: { listId: list.id, title },
                        refetchQueries: [{ query: TASK_LISTS }],
                      }).then(handleActionsClose)
                    }
                    color="primary"
                  >
                    Edit
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )
        }}
      </Mutation>

      <Mutation mutation={DELETE_LIST}>
        {(deleteList, { data }) => {
          return (
            <MenuItem
              onClick={() =>
                deleteList({
                  variables: { listId: list.id },
                  refetchQueries: [{ query: TASK_LISTS }],
                }).then(handleActionsClose)
              }
            >
              Delete list
            </MenuItem>
          )
        }}
      </Mutation>
    </Menu>
  )
}

export default ListSidebarContextMenu
