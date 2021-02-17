import React from 'react';
import './Body.css'
import ChatArea from './ChatArea'
import SideBar from './SideBar'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function Body(){
    return (

            <div className="body">

                <Router>
                    <SideBar />
                    <Switch>
                        <Route path="/chat/:chat_id">
                            <ChatArea />
                        </Route>
                        <Route path="/">
                            <h1>choose the chat</h1>
                        </Route>
                    </Switch>
                </Router>
            </div>

        )
}

export default Body
