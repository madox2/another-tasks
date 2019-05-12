import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { makeStyles } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'
import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'

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

const UPDATE_TASK = gql`
  mutation UpdateTask(
    $title: String
    $notes: String
    $due: String
    $id: String
    $listId: String
  ) {
    updateTask(
      title: $title
      notes: $notes
      due: $due
      id: $id
      listId: $listId
    ) {
      id
      title
      notes
      due
    }
  }
`

function TaskForm({ data, listId, updateTask }) {
  const [title, setTitle] = useState(data.task.title || '')
  const [notes, setNotes] = useState(data.task.notes || '')
  const [due, setDue] = useState(data.task.due || '')
  const [list, setList] = useState(listId)
  const classes = useStyles()
  useEffect(() => {
    updateTask({
      variables: { title, notes, due, listId, id: data.task.id },
      optimisticResponse: {
        __typename: 'Mutation',
        updateComment: {
          id: data.task.id,
          __typename: 'Task',
          title,
          notes,
          due,
        },
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, notes, due])
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
          onChange={e => setList(e.target.value)}
        />
      </div>
      <br />
      <TextField
        label="Add date/time"
        type="date"
        className={classes.shortInput}
        InputLabelProps={{ shrink: true }}
        value={due}
        onChange={e => setDue(e.target.value)}
      />
    </div>
  )
}

export default function WithUpdateMutation(props) {
  return (
    <Mutation mutation={UPDATE_TASK}>
      {(updateTask, { data }) => (
        <TaskForm {...props} updateTask={updateTask} />
      )}
    </Mutation>
  )
}
