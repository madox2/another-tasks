import { DragDropContext } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { TasksLink } from '../components/Link'
import Template from './app/Template'
import ToolbarButton from '../components/ToolbarButton'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
  },
  shortInput: {
    width: '100%',
    maxWidth: 250,
  },
}))

export default function TaskDetailPage() {
  const classes = useStyles()
  return (
    <DragDropContext>
      <Template
        toolbar={<ToolbarButton component={TasksLink} Icon={BackIcon} />}
        right={<ToolbarButton component={TasksLink} Icon={DeleteIcon} />}
      >
        <div style={{ padding: 20 }}>
          <TextField
            label="Enter title"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="Add details"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
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
      </Template>
    </DragDropContext>
  )
}
