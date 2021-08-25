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
        connection.invoke("SendMessage", UserConnection, Values.content).then(() => 
            ChatHistory.push({
                user: selectedUser,
                content: Values.content
            })//not load repair!
        ).catch(err => console.log("Error not send!"))
        
    }
    console.log(ChatHistory);
    const [ActiveUsers, SetActiveUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");

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
    const ChatExit = () => {
        connection.stop();
        props.exit(false);
    }

    const handleChange = (e) => {
        if (!e.target.value) {
            return;
        }
        if (e.target.name === "user") {
            const GetUserName = ActiveUsers.filter(el => el.connectionId === e.target.value);
            setSelectedUser(GetUserName[0].userName);
        }

        setValues({
            ...Values,
            [e.target.name]: e.target.value
        })
    }
    
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
                            {ChatHistory && ChatHistory.map(data => <></>)}{/*Add messagesStyle*/}
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