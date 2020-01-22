import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useRef } from 'react';

const config = {
    apiKey: "AIzaSyDN6lgzeqjxaUTcatRu-dEnfFzNutThM5E",
    authDomain: "crwn-db-dbd10.firebaseapp.com",
    databaseURL: "https://crwn-db-dbd10.firebaseio.com",
    projectId: "crwn-db-dbd10",
    storageBucket: "crwn-db-dbd10.appspot.com",
    messagingSenderId: "348155069003",
    appId: "1:348155069003:web:4807197ed8c0cdafa2c3ce"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await useRef.get();
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
        return userRef;
    }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
