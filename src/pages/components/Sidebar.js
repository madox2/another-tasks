import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { range } from 'lodash-es'

const mockData = range(1, 10).map(i => ({
  key: i,
  title: `Item ${i}`,
}))

export function Sidebar() {
  return (
    <List>
      {mockData.map(({ key, title }) => (
        <ListItem disablePadding key={key}>
          <ListItemButton>
            <ListItemText primary={title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
