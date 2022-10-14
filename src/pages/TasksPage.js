import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { ReadMore } from '@mui/icons-material'

export function TasksPage() {
  return (
    <List>
      {[0, 1, 2, 3].map(value => {
        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end">
                <ReadMore />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton dense>
              <ListItemIcon>
                <Checkbox edge="start" disableRipple />
              </ListItemIcon>
              <ListItemText primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
