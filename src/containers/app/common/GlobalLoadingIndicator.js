import { useContext, useEffect } from 'react'

import { LoadingConext } from './LoadingContext'

export default function GlobalLoadingIndicator() {
  const { putLoading, clearLoading } = useContext(LoadingConext)
  useEffect(() => {
    putLoading()
    return () => clearLoading()
    // eslint-disable-next-line
  }, [])
  return null
}
