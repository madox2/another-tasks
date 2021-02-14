import React from 'react'

export const LoadingConext = React.createContext()

export class LoadingContextProvider extends React.Component {
  state = { loading: 0 }
  putLoading = () => this.setState((state) => ({ loading: state.loading + 1 }))
  clearLoading = () =>
    this.setState((state) => ({ loading: state.loading - 1 }))
  render() {
    return (
      <LoadingConext.Provider
        value={{
          loading: this.state.loading,
          putLoading: this.putLoading,
          clearLoading: this.clearLoading,
        }}
        {...this.props}
      />
    )
  }
}
