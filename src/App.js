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
              {<SignOut/>}
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
    auth.onAuthStateChanged(function(user) {
        if (user) {

            const users = db.collection('users');
            const {uid, photoURL, displayName, email} = auth.currentUser;
            console.log("loging "+ users.doc(uid).id)
            var flag = false;
            flag = users.docs.map(doc => {
                if (doc.id === uid){
                    return true
                }

            })
            if (!flag){
                console.log("im in" + uid)
                users.doc(uid).set({
                    name: displayName,
                    email: email,
                    photoURL: photoURL,
                    chats: []
                }).then();
            }

        } else {
        }
    });
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider);
    }
    return(
        <button onClick = {signInWithGoogle}>Sign in with Google</button>
    )
}

export default App;
