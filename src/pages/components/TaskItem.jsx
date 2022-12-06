import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
} from '@mui/material'
import { DragIndicator, Notes as NotesIcon } from '@mui/icons-material'
import { useFormContext, Controller } from 'react-hook-form'
import { useRef } from 'react'

import { DragType, useGlobalState } from '../../state'
import { useDraggable } from './DNDContext'

export function TaskItem({
  task,
  onClick,
  onFocus,
  onBlur,
  selected,
  autoFocus,
}) {
  const [provided] = useDraggable()
  const [dragType] = useGlobalState('dragType')
  const textFieldRef = useRef()
  const { register, control } = useFormContext()
  return (
    <ListItem
      disablePadding
      sx={{
        '.MuiListItemIcon-root': {
          visibility: dragType === DragType.TASK ? 'inherit' : 'hidden',
        },
        '&:hover .MuiListItemIcon-root': {
          visibility: dragType === DragType.LIST ? 'hidden' : 'inherit',
        },
      }}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <ListItemButton
        disableRipple
        sx={{
          '&.Mui-focusVisible': { bgcolor: 'transparent' },
        }}
        onClick={() => textFieldRef.current?.focus()}
      >
        <ListItemIcon sx={{ ml: -2, mr: -2 }}>
          <IconButton
            {...provided.dragHandleProps}
            disableRipple
            onClick={e => e.preventDefault()}
          >
            <DragIndicator />
          </IconButton>
        </ListItemIcon>
        <Controller
          control={control}
          name={`${task.id}.completed`}
          render={({ field: props }) => (
            <Checkbox
              {...props}
              onClick={e => e.stopPropagation()}
              checked={props.value || false}
            />
          )}
        />
        <TextField
          inputRef={textFieldRef}
          autoFocus={autoFocus}
          InputProps={{
            ...register(`${task.id}.title`),
            onFocus: onFocus,
            onBlur: onBlur,
          }}
          variant="standard"
          sx={{
            width: '100%',
            ml: 2,
            '.MuiInputBase-root::before': {
              borderBottom: selected ? 'inherited' : 'none !important',
            },
          }}
        />
        {task.notes && (
          <NotesIcon fontSize="small" style={{ marginLeft: 10 }} />
        )}
      </ListItemButton>
    </ListItem>
  )
}
