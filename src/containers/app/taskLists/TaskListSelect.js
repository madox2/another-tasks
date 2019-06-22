import { Query } from 'react-apollo'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Select from '@material-ui/core/Select'

import { TASK_LISTS } from '../Sidebar'

export default function TaskListSelect({ ...props }) {
  return (
    <Query query={TASK_LISTS}>
      {({ loading, error, data }) => {
        if (loading) return <Select value="" />
        if (error) return <Select value="" />

        return (
          <Select {...props}>
            {data.taskLists.map(({ title, id }, index) => (
              <MenuItem key={id} value={id}>
                {title}
              </MenuItem>
            ))}
          </Select>
        )
      }}
    </Query>
  )
}
