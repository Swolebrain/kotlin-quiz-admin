import firebase from 'firebase'
import 'firebase/firestore'
import { config } from './firebaseCredential'

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()

export {
  db,
  auth
}
