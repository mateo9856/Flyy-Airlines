import React from "react";

const SendMessage = () => {

    const [Datas, setDatas] = useState({
        email: "",
        title: "",
        content: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {

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
                <textarea name="content" value={Datas.content} className="form-control" rows="4"></textarea>
            </div>
            <input className="btn btn-primary" value= "Send!" />
        </form>
        )
}

export default SendMessage;