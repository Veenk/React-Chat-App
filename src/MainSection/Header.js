import React from 'react';
import {Avatar} from "@material-ui/core";
import './Header.css'
import {Backspace} from "@material-ui/icons";
import {auth} from "../firebase";

function Header(prop){
    const SignOut = () => {
        auth.signOut()
    }
    return (
        <div className="header">
            <div className="header_left">
                <Avatar className="user_icon" src = {prop.url}>

                </Avatar>
                <h1>
                    Welcome to the club, buddy!
                </h1>
            </div>
            <div className="header_right">

                <div className="header_button" onClick={SignOut}>
                    <Backspace>

                    </Backspace>
                    <span>Sign Out</span>
                </div>
            </div>


        </div>
    )
}

export default Header
