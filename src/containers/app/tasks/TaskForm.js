import { compose } from 'react-apollo'
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import FormHelperText from '@material-ui/core/FormHelperText'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

import {
  mutateMoveToList,
  useUpdateTaskEffect,
  withMoveToListMutation,
  withUpdateTaskMutation,
} from './mutations'
import DateTimePicker from '../../../components/DateTimePicker'
import TaskListSelect from '../taskLists/TaskListSelect'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
  },
  shortInput: {
    width: '100%',
    maxWidth: 250,
  },
}))

function TaskForm({ data, listId, updateTask, moveToList, history }) {
  const [title, setTitle] = useState(data.task.title)
  const [notes, setNotes] = useState(data.task.notes || '')
  const [due, setDue] = useState(data.task.due || '')
  const [list, setList] = useState(listId)
  const classes = useStyles()
  useUpdateTaskEffect(updateTask, {
    ...data.task,
    title,
    notes: notes || null,
    due: due || null,
    listId,
  })
  return (
    <div style={{ padding: 20 }}>
      <TextField
        label="Enter title"
        className={classes.textField}
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        label="Add details"
        multiline
        rows="4"
        className={classes.textField}
        margin="normal"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <br />
      <div>
        <FormHelperText>Move to list</FormHelperText>
        <TaskListSelect
          className={classes.shortInput}
          value={list}
          onChange={e => {
            const targetListId = e.target.value
            setList(targetListId)
            if (list !== targetListId) {
              mutateMoveToList(moveToList, {
                targetListId,
                id: data.task.id,
                listId: list,
              })
              history.push(`/app/list/${targetListId}`)
            }
          }}
        />
      </div>
      <br />
      <DateTimePicker
        value={due}
        onChange={setDue}
        label="Add date/time"
        className={classes.shortInput}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  )
}

export default compose(
  withRouter,
  withUpdateTaskMutation,
  withMoveToListMutation
)(TaskForm)
