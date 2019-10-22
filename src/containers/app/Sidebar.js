import { Redirect, withRouter } from 'react-router-dom'
import { get } from 'lodash'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import React from 'react'

import {
  LAST_LIST_STORAGE_KEY,
  loadFromLocalStorage,
} from '../../app/utils/storageUtils'
import { LoadableQuery } from './common/LoadableQuery'
import { MINIMAL_TASK_LISTS, TASK_LIST } from '../../queries/taskListsQueries'
import AddTaskListButton from './taskLists/AddTaskListButton'
import ListSidebarContextMenu from './taskLists/ListSidebarContextMenu'
import SidebarTaskListItem from './taskLists/SidebarTaskListItem'

let prefetched = false

const isSelected = (match, id) =>
  match.path === '/app/list/:listId' && id === match.params.listId

function initialListPath(taskLists) {
  const lastListId = loadFromLocalStorage(LAST_LIST_STORAGE_KEY)
  const list = taskLists.find(l => l.id === lastListId)
  if (list) {
    return `/app/list/${lastListId}`
  }
  return `/app/list/${taskLists[0].id}`
}

function Sidebar({ match }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [list, setList] = React.useState(null)
  function handleActionsClick(event, list) {
    setAnchorEl(event.currentTarget)
    setList(list)
  }
  function handleActionsClose() {
    setAnchorEl(null)
  }
  return (
    <LoadableQuery query={MINIMAL_TASK_LISTS}>
      {({ data, client }) => {
        const taskLists = get(data, 'taskLists', [])
        // unknown or undefined
        const isUnknown = !taskLists.find(l => l.id === match.params.listId)
        if (taskLists[0] && isUnknown) {
          return <Redirect to={initialListPath(taskLists)} />
        }
        if (!prefetched) {
          taskLists.forEach(list => {
            client.query({
              query: TASK_LIST,
              variables: { id: list.id },
            })
          })
          prefetched = true
        }
        return (
          <List>
            <ListSubheader>Task lists</ListSubheader>
            {taskLists.map(({ title, id }, index) => (
              <SidebarTaskListItem
                key={id}
                id={id}
                title={title}
                handleActionsClick={handleActionsClick}
                selected={isSelected(match, id)}
              />
            ))}
            <AddTaskListButton />
            {list && (
              <ListSidebarContextMenu
                list={list}
                anchorEl={anchorEl}
                handleActionsClose={handleActionsClose}
              />
            )}
          </List>
        )
      }}
    </LoadableQuery>
  )
}

export default withRouter(Sidebar)
