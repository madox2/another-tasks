const taskOptimisticKeys = {}
const taskOptimisticIds = {}

export const isTaskOptimistic = taskId => taskOptimisticIds[taskId]

export const makeTaskOptimisticId = () => {
  const id = `${Date.now()}`
  taskOptimisticIds[id] = true
  return id
}

export const storeTaskOptimisticId = (taskId, optimisticId) => {
  taskOptimisticKeys[taskId] = optimisticId
}

export const getTaskKey = taskId => taskOptimisticKeys[taskId] || taskId
