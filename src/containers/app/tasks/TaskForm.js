import { makeStyles } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useState } from 'react'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
  },
  shortInput: {
    width: '100%',
    maxWidth: 250,
  },
}))

export default function TaskForm({ data }) {
  const [title, setTitle] = useState(data.task.title)
  const [notes, setNotes] = useState(data.task.notes || '')
  const classes = useStyles()
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
        <Select value={1} className={classes.shortInput}>
          <MenuItem value={1}>TODO</MenuItem>
          <MenuItem value={2}>Tomorrow</MenuItem>
          <MenuItem value={3}>Tmp</MenuItem>
          <MenuItem value={4}>Work</MenuItem>
        </Select>
      </div>
      <br />
      <TextField
        label="Add date/time"
        type="date"
        className={classes.shortInput}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  )
}
