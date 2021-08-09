import React from "react";
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
    }

    const handleChange = (e) => {
        setValues({
            ...Values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="chatBox">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className = "form-control" type="email" name="email" value={Values.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" name="title" value={Values.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" name="content" value={Values.content} onChange={handleChange} />
                </div>
                <input type="submit" className ="btn btn-primary btnChatPosition" value="Send!" />
            </form>
        </div>)
}

export default Chat;