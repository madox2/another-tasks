import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { makeStyles } from '@material-ui/core/styles'
import DetailIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import React, { useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import grey from '@material-ui/core/colors/grey'

import { TaskDetailLink } from '../components/Link'
import {
  useUpdateTaskEffect,
  withUpdateTaskMutation,
} from './app/tasks/TaskForm'
import CompletedCheckbox from '../components/CompletedCheckbox'
import DraggableList from '../components/DraggableList'
import DropTaskContainer from './app/tasks/DropTaskContainer'
import ListActionsToolbar from './app/tasks/ListActionsToolbar'
import ListContextMenu from './app/tasks/ListContextMenu'
import Template from './app/Template'

const useStyles = makeStyles(theme => ({
  completedInput: {
    textDecoration: 'line-through',
    color: grey[400],
  },
}))

const NoListSelected = ({ children, ...other }) => (
  <DropTaskContainer>
    <Template {...other}>{children}</Template>
  </DropTaskContainer>
)

export const TASK_LIST = gql`
  query TaskList($id: String!) {
    taskList(id: $id) {
      id
      title
      tasks {
        id
        title
        notes
        due
        completed
      }
    }
  }
`

function TaskItemComponent({ task, inputRef, listId, updateTask }) {
  const [title, setTitle] = useState(task.title || '')
  const [completed, setCompleted] = useState(task.completed || false)
  useUpdateTaskEffect(updateTask, {
    ...task,
    listId,
    title,
    completed,
  })
  const { notes, id } = task
  const classes = useStyles()
  return (
    <>
      <ListItemIcon>
        <CompletedCheckbox
          edge="start"
          checked={!!completed}
          tabIndex={-1}
          disableRipple
          onClick={() => setCompleted(!completed)}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            margin="none"
            fullWidth
            inputRef={inputRef}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: completed && classes.completedInput,
              },
            }}
          />
        }
        secondary={notes}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Task detail"
          component={TaskDetailLink(listId, id)}
        >
          <DetailIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  )
}

const TaskItem = withUpdateTaskMutation(TaskItemComponent)

function TasksPage({ match: { params } }) {
  const firstTaskText = useRef()

  if (!params.listId) {
    return <NoListSelected toolbar="Select list" />
  }
  return (
    <Query variables={{ id: params.listId }} query={TASK_LIST}>
      {({ loading, error, data }) => {
        if (loading) return <NoListSelected>Loading...</NoListSelected>
        if (error) return <NoListSelected>Error :(</NoListSelected>

        return (
          <DropTaskContainer data={data} listId={params.listId}>
            <Template toolbar={data.taskList.title} right={<ListContextMenu />}>
              <ListActionsToolbar
                listId={params.listId}
                onTaskAdd={() => {
                  firstTaskText.current.focus()
                }}
              />
              <DraggableList
                onDragEnd={() => 0}
                items={data.taskList.tasks.map((task, idx) => {
                  return {
                    id: task.id,
                    children: (
                      <TaskItem
                        key={task.id}
                        task={task}
                        inputRef={idx === 0 ? firstTaskText : undefined}
                        listId={params.listId}
                      />
                    ),
                  }
                })}
              />
            </Template>
          </DropTaskContainer>
        )
      }}
    </Query>
  )
}

export default TasksPage
