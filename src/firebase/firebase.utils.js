import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDN6lgzeqjxaUTcatRu-dEnfFzNutThM5E",
    authDomain: "crwn-db-dbd10.firebaseapp.com",
    databaseURL: "https://crwn-db-dbd10.firebaseio.com",
    projectId: "crwn-db-dbd10",
    storageBucket: "crwn-db-dbd10.appspot.com",
    messagingSenderId: "348155069003",
    appId: "1:348155069003:web:4807197ed8c0cdafa2c3ce"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
