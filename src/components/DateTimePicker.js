import React from 'react'
import TextField from '@material-ui/core/TextField'

// local date format - YYYY-MM-DD

const fromLocalToISO = localDate => localDate && localDate + 'T00:00:00.000Z'

const fromISOToLocal = isoDate => isoDate && isoDate.substring(0, 10)

export default function DateTimePicker({ value, onChange, ...other }) {
  return (
    <TextField
      type="date"
      value={fromISOToLocal(value)}
      onChange={e => {
        onChange(fromLocalToISO(e.target.value))
      }}
      {...other}
    />
  )
}
