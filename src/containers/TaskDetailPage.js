import { DragDropContext } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import Template from './app/Template'

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
  },
  short: {
    width: '100%',
    maxWidth: 250,
  },
  button: {
    color: 'white',
  },
}))

const MyLink = React.forwardRef((props, ref) => (
  <Link to="/app/list" {...props} ref={ref} />
))

export default function TaskDetailPage() {
  const classes = useStyles()
  return (
    <DragDropContext>
      <Template
        toolbar={
          <IconButton component={MyLink} className={classes.button}>
            <BackIcon />
          </IconButton>
        }
        contextMenu={
          <IconButton component={MyLink} className={classes.button}>
            <DeleteIcon />
          </IconButton>
        }
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
            <Select value={1} className={classes.short}>
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
            className={classes.short}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </Template>
    </DragDropContext>
  )
}
