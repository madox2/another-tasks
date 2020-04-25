import { makeStyles } from '@material-ui/core'
import DetailIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'

import { TaskDetailLink } from '../../../components/Link'
import { isTaskOptimistic } from '../../../app/optimisticCache'
import { shortenText } from '../../../app/utils/textUtils'
import {
  useAddTask,
  withUpdateTaskMutation,
} from '../../../queries/taskMutations'
import { useUpdateTaskEffect } from '../../../queries/taskHelpers'
import CompletedCheckbox from '../../../components/CompletedCheckbox'

const useStyles = makeStyles((theme) => ({
  completedInput: {
    textDecoration: 'line-through',
    color: grey[400],
  },
}))

const shortenNotes = shortenText(100)

function TaskItem({ task, autoFocus, listId, updateTask }) {
  const [title, setTitle] = useState(task.title)
  const [status, setStatus] = useState(task.status)
  const [addTask] = useAddTask({ listId })
  const inputRef = useRef()
  useEffect(() => {
    // re-initialize state after manual refresh
    if (status !== task.status) {
      setStatus(task.status)
    }
    if (title !== task.title) {
      setTitle(task.title)
    }
  }, [task.status, task.title || '']) // eslint-disable-line
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])
  useUpdateTaskEffect(updateTask, {
    ...task,
    listId,
    title,
    status,
  })
  const { notes, id } = task
  const classes = useStyles()
  const isOptimistic = isTaskOptimistic(id)
  return (
    <>
      <ListItemIcon>
        <CompletedCheckbox
          edge="start"
          status={status}
          setStatus={isOptimistic ? () => 0 : setStatus}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <TextField
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                addTask()
              }
            }}
            value={title || ''}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
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
          tabIndex="-1"
          edge="end"
          aria-label="Task detail"
          component={isOptimistic ? undefined : TaskDetailLink(listId, id)}
        >
          <DetailIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  )
}

export default withUpdateTaskMutation(TaskItem)
