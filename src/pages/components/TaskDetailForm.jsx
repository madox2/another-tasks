import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

export function TaskDetailForm({ task }) {
  const { register, control } = useFormContext()
  return (
    <>
      <TextField
        variant="standard"
        multiline
        placeholder="Notes"
        fullWidth
        margin="normal"
        minRows={5}
        maxRows={25}
        InputProps={register(`${task.id}.notes`)}
      />
      <Controller
        control={control}
        name={`${task.id}.due`}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label="Due date"
            value={value || null}
            onChange={onChange}
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
        )}
      />
    </>
  )
}
