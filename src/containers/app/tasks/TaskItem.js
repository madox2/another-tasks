import { makeStyles } from '@material-ui/core'
import DetailIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'

import { TaskDetailLink } from '../../../components/Link'
import { shortenText } from '../../../app/utils/textUtils'
import { useUpdateTaskEffect } from '../../../queries/taskHelpers'
import { withUpdateTaskMutation } from '../../../queries/taskMutations'
import CompletedCheckbox from '../../../components/CompletedCheckbox'

const useStyles = makeStyles(theme => ({
  completedInput: {
    textDecoration: 'line-through',
    color: grey[400],
  },
}))

const shortenNotes = shortenText(100)

function TaskItem({ task, inputRef, listId, updateTask }) {
  const [title, setTitle] = useState(task.title || '')
  const [status, setStatus] = useState(task.status)
  useUpdateTaskEffect(updateTask, {
    ...task,
    listId,
    title: title || null,
    status,
  })
  const { notes, id } = task
  const classes = useStyles()
  return (
    <>
      <ListItemIcon>
        <CompletedCheckbox
          edge="start"
          status={status}
          setStatus={setStatus}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            margin="none"
            fullWidth
            inputRef={inputRef}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: status === 'completed' && classes.completedInput,
              },
            }}
          />
        }
        secondary={shortenNotes(notes)}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Task detail"
          component={TaskDetailLink(listId, id)}
        >
          <DetailIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  )
}

export default withUpdateTaskMutation(TaskItem)
