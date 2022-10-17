import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { gapi } from '../gclient'
import { useHandleError } from '../errors'
import config from '../config'

export const loadPromise = new Promise((resolve, reject) =>
  gapi.load('client', () => {
    gapi.client
      .init({
        apiKey: config.gapiKey,
        clientId: config.gapiClientId,
        scope: 'https://www.googleapis.com/auth/tasks',
      })
      .then(resolve)
      .catch(reject)
  })
)

const SIGNED_IN_USER = { isSignedIn: true, id: 'current' }

async function login() {
  try {
    await gapi.auth2.getAuthInstance().signIn()
  } catch (e) {
    console.error('login error', e)
    throw new Error('Failed to log in')
  }
  return SIGNED_IN_USER
}

async function logout() {
  try {
    await gapi.auth2.getAuthInstance().signOut()
  } catch (e) {
    console.error('logout error', e)
    throw new Error('Failed to log out')
  }
}

async function getCurrentUser() {
  try {
    await loadPromise
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    return isSignedIn ? SIGNED_IN_USER : null
  } catch (e) {
    console.error('error loading google script', e)
    throw new Error('Failed connect to Google')
  }
}

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const onError = useHandleError()
  return useMutation(login, {
    onSuccess: () => queryClient.invalidateQueries('currentUser'),
    onError,
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const onError = useHandleError()
  return useMutation(logout, {
    onSuccess: () => queryClient.invalidateQueries('currentUser'),
    onError,
  })
}

export const useCurrentUser = () => {
  const onError = useHandleError()
  return useQuery(['currentUser'], getCurrentUser, { onError })
}
