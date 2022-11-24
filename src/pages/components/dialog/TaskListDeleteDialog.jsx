import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export function TaskListDeleteDialog({
  onClose,
  onDelete,
  listTitle,
  disabled,
}) {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Delete list</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete list "{listTitle}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} disabled={disabled}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
