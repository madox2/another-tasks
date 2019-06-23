import { Mutation } from 'react-apollo'
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
    <>
      <FabButton aria-label="Add list" Icon={AddIcon} onClick={handleClickOpen}>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Mutation mutation={ADD_LIST}>
            {(addList, { data }) => {
              function handleCreate() {
                addList({
                  variables: { title },
                  refetchQueries: [{ query: MINIMAL_TASK_LISTS }],
                })
                  .then(result => {
                    history.push(`/app/list/${result.data.addList.id}`)
                  })
                  .catch(err => {
                    // TODO: handle error
                    console.log(err)
                  })
                setOpen(false)
              }
              return (
                <Button onClick={handleCreate} color="primary">
                  Create
                </Button>
              )
            }}
          </Mutation>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withRouter(AddTaskListButton)
