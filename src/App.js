import React, { useState, useEffect} from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import Header from './MainSection/Header'
import Body from './MainSection/Body'

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import db, {auth, provider} from "./firebase";




function App() {
    const [user] = useAuthState(auth);

    const [users_collection] = useCollectionData(db.collection('users'))
      return (

          <section>

              {user ? <div className='app'>
                  <Header url = {auth.currentUser.photoURL}>
                  </Header>
                  <Body>
                  </Body></div> : <SignIn />}

          </section>
      );
}

function SignOut(){
    return auth.currentUser && (
        <button onClick = {() => auth.signOut()}> Sign Out </button>
    )
}

function SignIn(){
    // auth.onAuthStateChanged(function(user) {
    //     if (user) {
    //
    //
    //
    //         // if (users.doc(uid).id){
    //         //     console.log("im in" + uid)
    //         //     users.doc(uid).add({
    //         //         name: displayName,
    //         //         email: email,
    //         //         photoURL: photoURL,
    //         //     }).then();
    //         // }
    //
    //     } else {
    //     }
    // });
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider).then(
            results => {
                const users = db.collection('users');
                const {uid, photoURL, displayName, email} = auth.currentUser;
                users.doc(uid).get().then((docSnapshot) => {
                        if (!docSnapshot.exists) {
                            users.doc(uid).set({
                                name: displayName,
                                email: email,
                                photoURL: photoURL
                            }) // create the document
                        }
                    });
            }
        );
    }
    return(
        <button onClick = {signInWithGoogle}>Sign in with Google</button>
    )
}

export default App;
