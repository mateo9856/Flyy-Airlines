import React, { useContext, useEffect, useState } from "react";
import { MdExitToApp } from 'react-icons/md';
import "../css/Chat.css";
import FetchDatas from "../FetchDatas";
import "@microsoft/signalr";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AppContext } from "../AppContext";

const Chat = (props) => {

    const [Values, setValues] = useState({
        email: "",
        title: "",
        content: ""
    })

    const [UserConnection, setUserConnection] = useState("");

    const ChatHistory = [];

    const [context, setContext] = useContext(AppContext);

    const handleSubmit = (e) => {
        //FetchDatas.Post('api/Messages', {
        //    authorId: props.author,
        //    receiverEmail: Values.email,
        //    title: Values.title,
        //    content: Values.content
        //})
        //props.exit(false);
        e.preventDefault();
        connection.invoke("SendMessage", UserConnection, Values.content).catch(err => console.log("Error not send!"))
        
    }

    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('/chatHub', { accessTokenFactory: () => context.userData.token })
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(res => console.log("Succesful load!"))
            //WORK WITH THEN !.then(() => newConnection.invoke('getConnectionId').then(data => setConnection(data)).catch(err => console.log("Invoke Error")))
            .catch(err => console.log("Error not loading!"));

        newConnection.on('ReceiveMessage', (user, message) => {
            setValues({
                ...Values,
                content: ""
            })
            ChatHistory.push(message);
            console.log(ChatHistory);
        })

        setConnection(newConnection);
    }, [])

    console.log(connection);
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