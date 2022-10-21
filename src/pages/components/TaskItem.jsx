import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
} from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { DragIndicator } from '@mui/icons-material'
import { useRef } from 'react'

import { DragType, useGlobalState } from '../../state'
import { useDraggable } from './DNDContext'
export function TaskItem({ task, onClick, onFocus, onBlur, selected }) {
  const [provided] = useDraggable()
  const [dragType] = useGlobalState('dragType')
  const textFieldRef = useRef()
  const { register } = useFormContext()
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
        <Checkbox onClick={e => e.stopPropagation()} />
        <TextField
          inputRef={textFieldRef}
          InputProps={{
            ...register(`${task.id}.list.title`),
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
      </ListItemButton>
    </ListItem>
  )
}
