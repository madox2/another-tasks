import { Link } from 'react-router-dom'
import React from 'react'

import { isRootHost } from '../app/routes'

export function link(to) {
  const RouteLink = React.forwardRef((props, ref) => (
    <Link to={to} {...props} ref={ref} />
  ))
  return RouteLink
}

function externalLink(url) {
  const ExternalLink = React.forwardRef((props, ref) => (
    /* eslint-disable-next-line */
    <a href={url} {...props} ref={ref} />
  ))
  return ExternalLink
}

function absoluteLink(url) {
  return externalLink('https://tasks.anothertasks.com' + url)
}

export const TaskDetailLink = (listId, id) =>
  link(`/app/list/${listId}/task/${id}`)
export const TaskListLink = id => link(`/app/list/${id}`)
export const WelcomeLink = link('/')
export const ContactLink = link('/contact')
export const TermsLink = link('/privacy')
export const LoginLink = isRootHost ? absoluteLink('/login') : link('/login')
export const TasksAppLink = isRootHost ? absoluteLink('/app/') : link('/app/')
