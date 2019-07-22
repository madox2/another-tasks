import { Link } from 'react-router-dom'
import React from 'react'

import { isRootHost } from '../app/routes'

export function link(to) {
  const RouteLink = React.forwardRef((props, ref) => (
    <Link to={to} {...props} ref={ref} />
  ))
  return RouteLink
}

export const TasksLink = link('/app/list')
export const TaskDetailLink = (listId, id) =>
  link(`/app/list/${listId}/task/${id}`)
export const TaskListLink = id => link(`/app/list/${id}`)
export const WelcomeLink = link('/')
export const ContactLink = link('/contact')
export const TermsLink = link('/privacy')
export const LoginLink = link(
  isRootHost ? 'https://tasks.anothertasks.com/login' : '/login'
)
