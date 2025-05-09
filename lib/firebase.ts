import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCwM9Alfze-u0Y6E7gAuZ4D-VS7cuDfgv8",
  authDomain: "flamepath-academy.firebaseapp.com",
  projectId: "flamepath-academy",
  storageBucket: "flamepath-academy.appspot.com", // Corrected this line
  messagingSenderId: "109219705937",
  appId: "1:109219705937:web:c56295df30a6c724ac7470",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
