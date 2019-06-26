import { withRouter } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import TextField from '@material-ui/core/TextField'

import { ADD_LIST } from '../../../queries/taskListsMutations'
import { LoadableMutation } from '../common/LoadableMutation'
import { MINIMAL_TASK_LISTS } from '../../../queries/taskListsQueries'
import FabButton from '../../../components/FabButton'

function AddTaskListButton({ history }) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')

  function handleClickOpen() {
    setOpen(true)
  }

  function handleCancel() {
    setOpen(false)
  }

  return (
    <LoadableMutation mutation={ADD_LIST}>
      {(addList, { data, loading }) => {
        function handleCreate() {
          addList({
            variables: { title },
            awaitRefetchQueries: true,
            refetchQueries: [{ query: MINIMAL_TASK_LISTS }],
          })
            .then(result => {
              setOpen(false)
              history.push(`/app/list/${result.data.addList.id}`)
            })
            .catch(err => {
              setOpen(false)
              throw err
            })
        }
        return (
          <>
            <FabButton
              aria-label="Add list"
              Icon={AddIcon}
              onClick={handleClickOpen}
            >
              Add list
            </FabButton>
            <Dialog
              open={open}
              onClose={handleCancel}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New list</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="List Name"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  disabled={loading}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCancel}
                  color="primary"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  color="primary"
                  disabled={loading}
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      }}
    </LoadableMutation>
  )
}

export default withRouter(AddTaskListButton)
