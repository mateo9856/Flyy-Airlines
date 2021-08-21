import React, { useContext, useEffect, useState } from "react";
import { MdExitToApp } from 'react-icons/md';
import "../css/Chat.css";
import FetchDatas from "../FetchDatas";
import "@microsoft/signalr";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AppContext } from "../AppContext";

const Chat = (props) => {

    const [Values, setValues] = useState({
        user: "",
        content: ""
    })

    const [UserConnection, setUserConnection] = useState("");

    const ChatHistory = [];

    const [context, setContext] = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        connection.invoke("SendMessage", UserConnection, Values.content).catch(err => console.log("Error not send!"))
        
    }

    const [ActiveUsers, SetActiveUsers] = useState([]);

    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('/chatHub', { accessTokenFactory: () => context.userData.token })
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(res => console.log("Succesful load!"))
            .then(() => newConnection.invoke("GetConnectionId").then((connectionId) => console.log(connectionId)).catch(err => console.log("Invoke Error")))
            .then(() => newConnection.invoke("GetConnectedUsers").then((res) => SetActiveUsers(res)))
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
                    User:
                    {ActiveUsers &&
                        <select className="form-control form-control-sm" value={Values.user} onChange={handleChange}>
                            {ActiveUsers.map(data => <option value={data.connectionId}>{data.userName}</option>)}
                        </select>}
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