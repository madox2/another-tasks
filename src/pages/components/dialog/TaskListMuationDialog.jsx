import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useState } from 'react'

export function TaskListMutationDialog({
  onClose,
  onAction,
  actionTitle,
  title,
  defaultValue = '',
  disabled,
}) {
  const [value, setValue] = useState(defaultValue)
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="List name"
          fullWidth
          variant="standard"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={disabled}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onAction(value)} disabled={!value || disabled}>
          {actionTitle}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
