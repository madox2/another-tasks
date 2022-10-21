import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useState } from 'react'

export function TaskDetailForm({ task }) {
  const [dueDate, setDueDate] = useState(null)
  const { register } = useFormContext()
  return (
    <>
      <TextField
        variant="standard"
        fullWidth
        margin="normal"
        placeholder="title"
        InputProps={register(`${task.id}.detail.title`)}
      />
      <DatePicker
        label="Due date"
        value={dueDate}
        onChange={newDueDate => {
          setDueDate(newDueDate)
        }}
        renderInput={params => (
          <TextField variant="standard" margin="normal" {...params} />
        )}
        PaperProps={{
          onClick: e => {
            // stop propagation to prevent triggering click-outside
            e.stopPropagation()
          },
        }}
      />
      <TextField
        defaultValue={task.notes}
        variant="standard"
        multiline
        placeholder="Notes"
        fullWidth
        margin="normal"
        rows={5}
      />
    </>
  )
}
