import { Link } from 'react-router-dom'
import React from 'react'

export function link(to) {
  const RouteLink = React.forwardRef((props, ref) => (
    <Link to={to} {...props} ref={ref} />
  ))
  return RouteLink
}

export const TasksLink = link('/app/list')
export const TaskDetailLink = id => link(`/app/task/${id}`)
export const TaskListLink = id => link(`/app/list/${id}`)
