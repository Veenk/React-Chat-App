import {Avatar} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import './MessageBubble.css'
import db, {auth} from "../firebase";
import ChatArea from "../MainSection/ChatArea";
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

function MessageBubble(props) {
    console.log("in message bouble " + props.chat_id)
    const [user, setUser] = useState({});
    const [selected, setSelected] = useState(0);
    useEffect(() => {
            db.collection('users').doc(props.msg.sender_id).onSnapshot(snap => {
                setUser({
                    ava: snap.data().photoURL,
                    name: snap.data().name
                })

            })
        }, []
    )


    const message_bubble_class = props.msg.sender_id === auth.currentUser.uid ? "sent" : "received";


    const some = () => {
        if (selected) {
            setSelected(0);
            props.parentInputClassSetter(0);
            props.parentFormMessageSetter("");
            props.parentUpdateSetter(0)
        } else {
            setSelected(1);
            props.parentInputClassSetter(1);
            props.parentFormMessageSetter(props.msg.text);
            props.parentUpdateSetter(props.msg)
        }

    }
    return (
        <>
            <div
                className={selected ? "selected" + ` message_bubble_${message_bubble_class}` : "not_selected" + ` message_bubble_${message_bubble_class}`}
                onClick={some}>
                <Avatar className="message_bubble_avatar" src={user.ava}>

                </Avatar>
                <div className="message_bubble_content">
                    <div className="top_row">
                        <div className="name">
                            {user.name}
                        </div>
                        <span>
                            {Math.floor((props.msg.createdAt.seconds / (1000 * 60)) % 60) + ":" + Math.floor((props.msg.createdAt.seconds / (1000 * 60 * 60)) % 24)}
                        </span>
                    </div>
                    <div className="message">
                        {props.msg.text}
                    </div>
                    <div className="bottom_row">

                        <span>
                            {props.msg.edited ? "edited" : ""}
                        </span>
                    </div>

                </div>
                {selected? <DivDelete chat_id = {props.chat_id} msg = {props.msg}/> : <div></div>}

            </div>

        </>
    )
}

function DivDelete(props) {
    console.log("hey " + props.chat_id)
    console.log("hey " + props.msg.id)
    const messages_collection = db.collection('chats').doc(props.chat_id).collection("messages");
    const deleteMessage = () => {
        let query = messages_collection.doc(props.msg.id);
        query.delete();
    }
    return (
        <button className='delete' onClick={deleteMessage}>
            <DeleteOutlineRoundedIcon/>
        </button>
    )
}
export default MessageBubble
