import React, { useState } from "react";
import { MdExitToApp } from 'react-icons/md';
import "../css/Chat.css";
import FetchDatas from "../FetchDatas";

const Chat = (props) => {

    const [Values, setValues] = useState({
        email: "",
        title: "",
        content: ""
    })

    const handleSubmit = (e) => {
        FetchDatas.Post('api/Messages', {
            authorId: props.author,
            receiverEmail: Values.email,
            title: Values.title,
            content: Values.content
        })
        props.exit(false);
    }

    const handleChange = (e) => {
        setValues({
            ...Values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="chatBox">
            <div>
                <button className="chatExit" onClick={() => props.exit(false)}><MdExitToApp style={{ fontSize: "26px" }} /></button>
            </div>
            <form className = "chatFormFlex" onSubmit={handleSubmit}>
                <div className="form-group">
                    Email:
                    <input className = "form-control" type="email" name="email" value={Values.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    Topic:
                    <input className="form-control" type="text" name="title" value={Values.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    Content:
                    <textarea className="form-control" rows="6" type="text" name="content" value={Values.content} onChange={handleChange} />
                </div>
                <div className= "form-group btnChatPosition">
                    <input type="submit" className="btn btn-primary" value="Send!" />
                </div>
            </form>
        </div>)
}

export default Chat;