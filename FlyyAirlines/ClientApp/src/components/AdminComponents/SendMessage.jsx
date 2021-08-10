import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import FetchDatas from "../../FetchDatas";

const SendMessage = (props) => {

    const [context, setContext] = useContext(AppContext);

    const [Datas, setDatas] = useState({
        email: "",
        title: "",
        content: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Datas);
        FetchDatas.Post('api/Messages', {
            authorId: context.userData.id,
            receiverEmail: Datas.email,
            title: Datas.title,
            content: Datas.content
        })
        props.exit(false);
    }

    const handleChange = (e) => {
        setDatas({
            ...Datas,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                Send to(enter e-mail):
                <input className="form-control" value={Datas.email} type="email" name="email" onChange={handleChange} /> 
            </div>
            <div className="form-group">
                Title:
                <input className="form-control" value={Datas.title} type="text" name="title" onChange={handleChange} />
            </div>
            <div className="form-group">
                Content:
                <textarea name="content" value={Datas.content} className="form-control" rows="4" onChange={handleChange} />
            </div>
            <input type= "submit" className="btn btn-primary" value= "Send!" />
        </form>
        )
}

export default SendMessage;