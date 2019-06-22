import { gapi } from '../gclient'

export const loadPromise = new Promise((resolve, reject) =>
  gapi.load('client', () => {
    gapi.client
      .init({
        apiKey: 'AIzaSyBunpwtoigyK4etSYXKcYFpshlEQMVTICQ',
        clientId:
          '333742812720-jt7v5s1asqfhuc8a9ulbiv5mp70eq66c.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/tasks',
      })
      .then(resolve)
      .catch(reject)
  })
)

const SIGNED_IN_USER = { isSignedIn: true, id: 'current' }
const SIGNED_OUT_USER = { isSignedIn: false, id: 'current' }

async function login() {
  try {
    await gapi.auth2.getAuthInstance().signIn()
  } catch (e) {
    console.error('login error', e)
    return SIGNED_OUT_USER
  }
  return SIGNED_IN_USER
}

async function logout() {
  try {
    await gapi.auth2.getAuthInstance().signOut()
  } catch (e) {
    console.error('logout error', e)
  }
  return SIGNED_OUT_USER
}

export const authResolvers = {
  Query: {
    currentUser: async () => {
      try {
        await loadPromise
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        return isSignedIn ? SIGNED_IN_USER : SIGNED_OUT_USER
      } catch (e) {
        console.error('error loading google script', e)
        return SIGNED_OUT_USER
      }
    },
  },
  Mutation: {
    login,
    logout,
  },
}
