import React, {useEffect, useState} from "react";
import {Search} from "@material-ui/icons";
import "./SideBar.css"
import db from "../firebase"
import {auth} from "../firebase";
import firebase from 'firebase/app';
import 'firebase/firestore'
import Contact from "../FuncRender/Contact.js"


function SideBar(){

    const [chats, setChats] = useState([]);
    const [search, setSearch] = useState("");
    const {uid, photoURL, displayName, email} = auth.currentUser;
    const users_collection = db.collection('users');
    useEffect(() => {
        users_collection.doc(uid).onSnapshot(snapshot => {
            setChats(snapshot.data().chats);
        })

    }, [])

    const searchForUser = async(e) =>{
        e.preventDefault()
        users_collection.get().then(docs => {
            docs.docs.map(doc => {
                if(doc.data().email === search){
                    db.collection('chats').add({
                        last_message:"",
                        pen_friends: [uid, doc.id]
                    }).then(docRef => {
                        users_collection.doc(uid).update({chats: firebase.firestore.FieldValue.arrayUnion(docRef.id)})
                        users_collection.doc(doc.id).update({chats: firebase.firestore.FieldValue.arrayUnion(docRef.id)})
                    })
            }})

        })
        setSearch('')
    }


    return (
        <section className='sidebar'>
            <div className='search'>
                <button type='submit' onClick={searchForUser}>
                    <Search >
                    </Search>
                </button>
                <input placeholder="search for user by email" className="contact_search" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className='contacts'>
                {console.log(chats)}
                {chats && chats.map(chat => (

                        <Contact chat_id={chat} uid={uid}/>
                    ))}
            </div>
        </section>
    )
}


export default SideBar