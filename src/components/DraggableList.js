import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core'
import DragIcon from '@material-ui/icons/DragIndicator'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import React from 'react'
import RootRef from '@material-ui/core/RootRef'
import grey from '@material-ui/core/colors/grey'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
})

const useStyles = makeStyles(theme => ({
  icon: {
    color: grey[500],
    marginLeft: -8,
    marginRight: 10,
  },
}))

export default function DraggableList(props) {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  const classes = useStyles()
  return (
    <DragDropContext
      onDragEnd={result => {
        // dropped outside the list
        if (!result.destination) {
          return
        }

        const items = reorder(
          props.items,
          result.source.index,
          result.destination.index
        )

        props.onDragEnd(items)
      }}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List>
              {props.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      ContainerComponent="li"
                      ContainerProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <DragIcon className={classes.icon} />
                      {item.children}
                      <ListItemSecondaryAction />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  )
}
