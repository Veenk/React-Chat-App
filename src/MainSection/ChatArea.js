import React, {useCallback, useEffect, useRef, useState} from "react";
import './ChatArea.css'
import {Avatar} from "@material-ui/core";
import {auth} from "../firebase";
import db from "../firebase"
import {useCollectionData} from "react-firebase-hooks/firestore";
import MessageBubble from "../FuncRender/MessageBubble";
import firebase from "firebase";
import {useParams} from "react-router-dom";


function ChatArea(){
    const {chat_id} = useParams();
    const chats_collection = db.collection('chats');
    const [formMessage, setFormMessage] = useState("");
    const [Messages, setMessages] = useState({});
    const [inputClass, setInputClass] = useState(0);
    const [update, setUpdate] = useState(0);


    const messages_collection = chats_collection.doc(chat_id).collection("messages");
    const [messages] = useCollectionData(messages_collection.orderBy('createdAt').limit(25), {idField: 'id'});


    const sendMessage = async (e) => {
        e.preventDefault();
        const {uid} = auth.currentUser;
        if(update){
            let query = messages_collection.doc(update.id);
            await query.update({text: formMessage, edited: true}).then(() => {
                setFormMessage("");
                setInputClass(0);
            })
        }else{
            if (formMessage !== "") {
                console.log("adding");
                await chats_collection.doc(chat_id).update({last_message: formMessage})
                await messages_collection.add({
                    text: formMessage,
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                    sender_id: uid,
                    edited: false
                }).then((t) => {
                    setFormMessage('');

                } );

            }
        }


    }
    const wrapperSetInputClass = useCallback(val => {
        setInputClass(val);
    }, [setInputClass]);

    const wrapperSetFormMessage = useCallback(val => {
        setFormMessage(val);
    }, [setFormMessage]);
    const wrapperSetUpdate = useCallback(val => {
        setUpdate(val);
    }, [setUpdate]);



    // const updateMessage = async(msg) => {
    //     let query = messages_collection.doc(msg.id);
    //     await query.update({text: formMessage, edited: true}).then(() => {
    //         setFormMessage("");
    //         setInputClass(0);
    //     })
    // }

    return (
        <section className='chat'>
            <div className="message_bubbles">
                {messages && messages.map(msg =>
                        <MessageBubble msg = {msg} chat_id = {chat_id}  parentInputClass={inputClass}
                                       parentInputClassSetter={wrapperSetInputClass}
                        parentFormMessae = {formMessage} parentFormMessageSetter = {wrapperSetFormMessage}
                        parentUpdate = {update} parentUpdateSetter = {wrapperSetUpdate}/>)}
            </div>
            <div className="input_message">
                <form className='form_message' onSubmit={sendMessage}>
                    <input placeholder="type your message" value={formMessage} onChange={(e) => setFormMessage(e.target.value)}/>
                    <button type = "submit">{inputClass === 0 ? "Send" : "Edit"}</button>
                </form>
            </div>




        </section>
    )
}

export default ChatArea

