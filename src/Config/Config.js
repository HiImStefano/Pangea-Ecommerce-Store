import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'



const firebaseConfig = {
    apiKey: "AIzaSyAHC4KBT5gu1cl4ocHXX-KLL1GjyXFLP0E",
    authDomain: "pangea-3d5e2.firebaseapp.com",
    databaseURL: "https://pangea-3d5e2-default-rtdb.firebaseio.com",
    projectId: "pangea-3d5e2",
    storageBucket: "pangea-3d5e2.appspot.com",
    messagingSenderId: "724307014991",
    appId: "1:724307014991:web:6fb758d7e62a209fbcc13a",
    measurementId: "G-HHXLNNB7JG"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const fstore= firebase.firestore();
  const storage = firebase.storage();

  export{auth, fstore, storage}