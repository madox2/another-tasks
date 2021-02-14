import { Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

import { DELETE_LIST } from '../../../queries/taskMutations'
import { MINIMAL_TASK_LISTS } from '../../../queries/taskListsQueries'

function DeleteListDialog({ list, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Mutation mutation={DELETE_LIST}>
        {(deleteList, { data }) => (
          <>
            <DialogTitle id="form-dialog-title">Delete list</DialogTitle>
            <DialogContent>
              Do you really want to delete list "{list.title}"?
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteList({
                    variables: { listId: list.id },
                    optimisticResponse: {
                      __typename: 'Mutation',
                      deleteList: {
                        id: list.id,
                        __typename: 'TaskList',
                      },
                    },
                    update: (proxy, { data: { deleteTask } }) => {
                      const data = proxy.readQuery({
                        query: MINIMAL_TASK_LISTS,
                      })
                      data.taskLists = data.taskLists.filter(
                        (t) => t.id !== list.id,
                      )
                      proxy.writeQuery({
                        query: MINIMAL_TASK_LISTS,
                        data,
                      })
                    },
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
      </Mutation>
    </Dialog>
  )
}

export default DeleteListDialog
