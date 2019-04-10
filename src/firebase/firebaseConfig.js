import firebase from 'firebase'
import 'firebase/firestore'
import { config } from './firebaseCredential'

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()

// collections que utiliza el proyecto TODO(cambiarlos despues por subject)
const questionCollection = db.collection('question')

export {
  db,
  auth,
  questionCollection
}
