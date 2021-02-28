import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-XN0EpkL93y-cDpe7G6tFoDGJzYWGulI",
  authDomain: "pocket-keeper-4e1c2.firebaseapp.com",
  projectId: "pocket-keeper-4e1c2",
  storageBucket: "pocket-keeper-4e1c2.appspot.com",
  messagingSenderId: "479259648374",
  appId: "1:479259648374:web:a910261a925ae275da1a57",
  measurementId: "G-ZLJJSSCS3G"
})

const db = firebaseApp.firestore();

export default db;