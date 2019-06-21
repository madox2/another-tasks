import { Droppable, Draggable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core'
import DragIcon from '@material-ui/icons/DragIndicator'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import React from 'react'
import RootRef from '@material-ui/core/RootRef'
import grey from '@material-ui/core/colors/grey'

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
    marginTop: 3,
  },
}))

export default function DraggableList(props) {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  const classes = useStyles()
  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <RootRef rootRef={provided.innerRef}>
          <List>
            {props.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div style={{ position: 'relative' }}>
                    <ListItem
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div
                        ref={provided.innerRef}
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 4,
                          width: 300,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span {...provided.dragHandleProps}>
                          <DragIcon className={classes.icon} />
                        </span>
                      </div>
                      <div style={{ display: 'inline-block', width: 23 }} />
                      {item.children}
                    </ListItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        </RootRef>
      )}
    </Droppable>
  )
}