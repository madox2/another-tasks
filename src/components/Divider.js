import React from 'react'

export const Divider = ({ size, horizontal }) =>
  horizontal ? (
    <div style={{ width: size }} />
  ) : (
    <div style={{ height: size, width: '100%' }} />
  )
