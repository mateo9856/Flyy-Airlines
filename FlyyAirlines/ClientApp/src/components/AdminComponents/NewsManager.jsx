import React, { useState } from "react";

const NewsManager = () => {

    const [activeAdd, setActiveAdd] = useState(false);

    const [newsState, setNewsState] = useState({
        title: "",
        content: "",
        imageUrl: ""
    })

    const [selectedImg, setSelectedImg] = useState(null);

    const handleChange = (e) => {
        setNewsState({
            ...newsState,
            [e.target.name]: e.target.value
        })
    }

    const AddNews = () => {
        setActiveAdd(true);
    }

    const handleSubmit = (e) => {
        //read how add file to db asp.net core 
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={AddNews}>NEW NEWS</button>
            {activeAdd && <div className="NewsAdd">
                <button onClick={() => setActiveAdd(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        Title:
                        <input className="form-control" type="text" name="title" value={newsState.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        Content:
                        <textarea onChange={handleChange} name="content" value={newsState.content} className="form-control" rows="5"></textarea>
                    </div>
                    <div className="form-group">
                        Enter IMG URL or Add from your Computer
                        <input className="form-control" onChange={handleChange} type="text" name="imageUrl" value={newsState.imageUrl} />
                        <input type="file" value={selectedImg} onChange={(e) => setSelectedImg(e.target.files[0])} className="form-control-file" />
                    </div>
                    <input className = "btn btn-primary" type="submit" value="Add" />
                </form>
            </div>}
        </div>
        )
}

export default NewsManager;