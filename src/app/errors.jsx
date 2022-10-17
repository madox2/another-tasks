import { Button } from '@mui/material'
import { useSnackbar } from 'notistack'

export function useHandleError(err) {
  const snack = useSnackbar()
  return err => {
    console.error(err)
    snack.enqueueSnackbar(err.message || 'Ooop something went wrong', {
      variant: 'error',
      action: key => (
        <Button
          variant="text"
          color="inherit"
          onClick={() => snack.closeSnackbar(key)}
        >
          DISMISS
        </Button>
      ),
    })
  }
}
