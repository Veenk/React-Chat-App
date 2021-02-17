import React, {useEffect, useState} from 'react'
import "./Contact.css"
import {Avatar} from "@material-ui/core";
import db from "../firebase";
import {useHistory} from 'react-router-dom'

import ChatArea from "../MainSection/ChatArea";
import {useCollectionData} from "react-firebase-hooks/firestore";

function Contact({uid,chat_id}){
    const chat = chat_id.trim(" ")
    const history = useHistory();
    const [contact, setContact] = useState({})
    const [credidentials, setCredidentials] = useState({})
    let ava;

    const chats_collection = db.collection('chats');
    const users_collection = db.collection('users');
    const messages_collection = chats_collection.doc(chat).collection("messages");

    db.collection('users').doc(uid).onSnapshot(snap =>{
        ava = snap.data().photoURL
    })

    useEffect(() => {

        console.log(chat)
        chats_collection.doc(chat).onSnapshot(snapshot => {
            snapshot.get("pen_friends").map(pen => {
                if (pen !== uid){
                    setContact({
                        user_id: pen,
                        last_msg: snapshot.get("last_message"),
                        avatar: ava
                        })
                    }
                })

            })
        },[])

    useEffect( () => {
        console.log(contact.user_id)
        users_collection.doc(contact.user_id).get().then((ref) => {
            if (ref.exists) {
                setCredidentials({name: ref.data().name, photo: ref.data().photoURL})
            }
        }).catch((error) => console.log("Error getting document:", error))
    }, [])

    const showChat = () => {
        history.push(`/chat/${chat}`)
    }

    return (
            <div className="contact_n" onClick={showChat}>
                <span className="tooltiptext">{chat_id}</span>
                <div className="contact_avatar">

                    <Avatar src = {credidentials.photo}>

                    </Avatar>
                </div>
                <div className="content">
                    <div className="credidentials">
                        {credidentials.name}
                    </div>
                    <div className="msg_preview">
                        {contact.last_msg}
                    </div>
                </div>
            </div>

        )
}
export default Contact