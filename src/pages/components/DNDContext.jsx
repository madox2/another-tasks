import { Draggable, Droppable } from 'react-beautiful-dnd'
import React, { useContext } from 'react'

const DroppableContext = React.createContext([{}, {}])

export function DroppableProvider({ children, ...props }) {
  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <DroppableContext.Provider value={[provided, snapshot]}>
          {children}
        </DroppableContext.Provider>
      )}
    </Droppable>
  )
}

export function useDroppable() {
  return useContext(DroppableContext)
}

const DraggableContext = React.createContext([{}, {}])

export function DraggableProvider({ children, ...props }) {
  return (
    <Draggable {...props}>
      {(provided, snapshot) => (
        <DraggableContext.Provider value={[provided, snapshot]}>
          {children}
        </DraggableContext.Provider>
      )}
    </Draggable>
  )
}

export function useDraggable() {
  return useContext(DraggableContext)
}
