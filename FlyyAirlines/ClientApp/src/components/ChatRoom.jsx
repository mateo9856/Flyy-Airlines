import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import "@microsoft/signalr";
import { HubConnectionBuilder } from '@microsoft/signalr';

const ChatRoom = (props) => {
    const [chat, setChat] = useState([]);

    const [context, setContext] = useContext(AppContext);
    const [user, setUser] = useState([]);
    const [message, setMessage] = useState("");
    const [connection, setConnection] = useState(null);


    useEffect(() => {
        const newConntection = new HubConnectionBuilder()
            .withUrl('chatHub')
            .withAutomaticReconnect()
            .build();
        setConnection(newConntection);
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start().then(res => console.log('Connect!'))
        }
    }, [connection])

    const MessageSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        if (connection.connectionStarted) {
            try {
                await connection.send('ReceiveMessage', message);//robic to!
            }
        }
    }

    const handleMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div className = "chatBox">
            <form onSubmit={MessageSubmit}>
                <div className="form-group">
                    <textarea className="form-control" rows="6" type="text" name="content" value={message} onChange={handleMessageUpdate} />
                </div>
                <input type= "submit" value="Napisz" />
                {chat.length > 0 ? chat.map(m => <div>
                    <p><b>{m.user}</b></p>
                    <p>{m.message}</p>
                </div>) : "" }
            </form>
        </div>
        )
}

export default ChatRoom;