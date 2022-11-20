import { keyBy } from 'lodash-es'
import { useEffect, useState } from 'react'

import { StorageKeys, setStorageItem } from '../../utils/storage'
import { useGlobalState } from '../../state'

export function orderLists(rawLists, listOrder) {
  if (!listOrder) {
    return rawLists
  }
  const listMap = keyBy(rawLists, 'id')
  const orderedFirst = listOrder
    .map(listId => listMap[listId])
    .filter(list => !!list)
  const orderedFirstMap = keyBy(orderedFirst, 'id')
  const orderedLast = rawLists.filter(({ id }) => !orderedFirstMap[id])
  return [...orderedFirst, ...orderedLast]
}

export function useSortedLists(rawLists) {
  const [sorted, setSorted] = useState(null)
  const [listOrder] = useGlobalState('listOrder')
  useEffect(() => {
    setStorageItem(StorageKeys.LIST_ORDER, listOrder)
  }, [listOrder])

  useEffect(() => {
    if (!rawLists) {
      return
    }
    const ordered = orderLists(rawLists, listOrder)
    setSorted(ordered)
  }, [rawLists, listOrder])
  return sorted
}
