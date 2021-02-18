import firebase from "firebase"

const firebaseCfg = {
    //add your config
   
};
const firebaseApp = firebase.initializeApp(firebaseCfg);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
