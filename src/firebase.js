import firebase from "firebase"

const firebaseCfg = {
    apiKey: "AIzaSyCLNXmFsfp6Uu5CPPZXf42j07RPTek2FT0",
    authDomain: "chatapp-f52f4.firebaseapp.com",
    projectId: "chatapp-f52f4",
    storageBucket: "chatapp-f52f4.appspot.com",
    messagingSenderId: "296118407503",
    appId: "1:296118407503:web:cbed5a10fcaa6a5df2753a"
};
const firebaseApp = firebase.initializeApp(firebaseCfg);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;