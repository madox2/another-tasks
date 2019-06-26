import { Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'

import { EDIT_LIST } from '../../../queries/taskMutations'

function RenameListDialog({ list, open, onClose }) {
  const { id } = list
  const [title, setTitle] = React.useState(list.title)
  useEffect(() => {
    setTitle(list && list.title)
    // eslint-disable-next-line
  }, [list && list.id])
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Mutation mutation={EDIT_LIST}>
        {(editList, { data }) => (
          <>
            <DialogTitle id="form-dialog-title">Rename list</DialogTitle>
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
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  editList({
                    variables: { listId: id, title },
                    optimisticResponse: {
                      __typename: 'Mutation',
                      editList: {
                        id: list.id,
                        title: title,
                        __typename: 'TaskList',
                      },
                    },
                  })
                  onClose()
                }}
                color="primary"
              >
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Mutation>
    </Dialog>
  )
}

export default RenameListDialog
