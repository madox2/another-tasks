import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

import { DELETE_LIST } from '../../../queries/taskMutations'
import { LoadableMutation } from '../common/LoadableMutation'
import { MINIMAL_TASK_LISTS } from '../../../queries/taskListsQueries'

function DeleteListDialog({ list, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <LoadableMutation mutation={DELETE_LIST}>
        {(deleteList, { data }) => (
          <>
            <DialogTitle id="form-dialog-title">Delete list</DialogTitle>
            <DialogContent>
              Do you really want to delete this list?
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteList({
                    variables: { listId: list.id },
                    refetchQueries: [{ query: MINIMAL_TASK_LISTS }],
                    awaitRefetchQueries: true,
                  })
                  onClose()
                }}
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </LoadableMutation>
    </Dialog>
  )
}

export default DeleteListDialog
