import React from 'react'

export default class ErrorBoundary extends React.Component {
  render() {
    return <>{this.props.children}</>
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }
}
