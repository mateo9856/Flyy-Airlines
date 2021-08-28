import React, { useContext, useEffect, useState, useRef } from "react";
import { MdExitToApp } from 'react-icons/md';
import "../css/Chat.css";
import FetchDatas from "../FetchDatas";
import "@microsoft/signalr";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AppContext } from "../AppContext";

const Chat = (props) => {
    //think how build support card and client to chat
    //think how get coords with open street map api
    const [Values, setValues] = useState({
        user: "",
        content: ""
    })

    const [UserConnection, setUserConnection] = useState("");

    const [chat, setChat] = useState([]);

    const ChatHistory = useRef(null);

    ChatHistory.current = chat;

    const [context, setContext] = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        connection.invoke("SendMessage", UserConnection, Values.content).catch(err => console.log("Send Error!"))
        
    }
    const [ActiveUsers, SetActiveUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");

    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('/chatHub', { accessTokenFactory: () => context.userData.token })
            .withAutomaticReconnect()
            .build();
        
        setConnection(newConnection);
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(res => console.log("Succesful load!"))
                .then(() => connection.invoke("GetConnectionId").then((connectionId) => console.log(connectionId)).catch(err => console.log("Invoke Error")))
                .then(() => connection.invoke("GetConnectedUsers").then((res) => SetActiveUsers(res)))
                .catch(err => console.log("Error not loading!"));

            connection.on('ReceiveMessage', (user, message) => {
                const updatedChat = [...ChatHistory.current];
                console.log(user, message);
                updatedChat.push({
                    user: user,
                    message: message
                });
                console.log(updatedChat);
                setChat(updatedChat);
                setValues({
                    ...Values,
                    content: ""
                })
            })
        }
    }, [connection])

    const ChatExit = () => {
        connection.stop();
        props.exit(false);
    }

    const handleChange = (e) => {
        if (!e.target.value) {
            return;
        }
        if (e.target.name === "user") {
            setUserConnection(e.target.value);
            const GetUserName = ActiveUsers.filter(el => el.connectionId === e.target.value);
            setSelectedUser(GetUserName[0].userName);
        }

        setValues({
            ...Values,
            [e.target.name]: e.target.value
        })
    }
    console.log(chat);
    return (
        <div className="chatBox">
            <div>
                <button className="chatExit" onClick={ChatExit}><MdExitToApp style={{ fontSize: "26px" }} /></button>
            </div>
            <form className="chatFormFlex" onSubmit={handleSubmit}>
                <div className="d-flex chatHeight flex-row align-items-stretch">
                <div className="w-25 p-2 listUsers">
                        {ActiveUsers &&
                            <select style={{ height: "400px", overflow: "hidden" }} multiple className="form-control form-control-sm" value={Values.user} name="user" onChange={handleChange}>
                                {ActiveUsers.map(data => <option value={data.connectionId}>{data.userName}</option>)}
                        </select>}
                </div>
                    <div className="w-75 p-2 chatContent">
                        <div className="userInfo">
                            <p className="h5 text-center">{selectedUser ? `Rozmowa z: ${selectedUser}` : "Wybierz osobę"}</p>
                        </div>
                        <div className="messageBox h-50 p-2">
                            {chat && chat.map(data => <>
                                <div style={{ marginBottom:"10px" }}>
                                    <span className={selectedUser === context.userData.user ? "chatBubble mainlyUser" : "chatBubble secondUser"}>{data.message}</span>
                                </div>
                            </>)}
                        </div>
                    <textarea className="form-control chatTextStyle" rows="2" type="text" name="content" value={Values.content} onChange={handleChange} />
                    </div>
                </div>
                <div className= "form-group bottomMargin p-2">
                    <input type="submit" className="btn btn-primary" value="Send!" />
                    </div>
                </form>

        </div>)
}

export default Chat;