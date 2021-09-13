import React, { useEffect, useRef, useState } from "react";
import FetchDatas from "../../FetchDatas";

const NewsManager = () => {

    const [activeAdd, setActiveAdd] = useState(false);

    const file = useRef()

    const [News, setNews] = useState([]);

    const [newsState, setNewsState] = useState({
        title: "",
        content: "",
        imageUrl: "",
    })

    const handleChange = (e) => {
        setNewsState({
            ...newsState,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        FetchDatas.Get('api/News', setNews);
    }, [])

    const AddNews = () => {
        setActiveAdd("post");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("topic", newsState.title);
        formData.append("content", newsState.content);
        formData.append("imageUrl", newsState.imageUrl);
        formData.append("imageFile", file.current.files[0]);
        if (activeAdd === "post") {
            FetchDatas.Post('api/News/AddNews', formData);
        }
        else {
            FetchDatas.Put('api/News/' + activeAdd, formData);
        }
        setActiveAdd(false);
    }

    const handleClick = (e) => {
        setActiveAdd(e.target.name);
    }

    const handleDelete = (e) => {
        FetchDatas.Delete('api/News/' + e.target.name)
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={AddNews}>NEW NEWS</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Topic</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {News.map(res => <tr>
                        <td>{res.topic}</td>
                        <td><button className = "btn btn-primary" name={res.id} onClick={handleClick}>Edit</button>
                            <button className = "btn btn-danger" name={res.id} onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            {activeAdd && <div className="NewsAdd">
                <button onClick={() => setActiveAdd(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        Title:
                        <input className="form-control" type="text" name="title" required value={newsState.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        Content:
                        <textarea onChange={handleChange} name="content" required value={newsState.content} className="form-control" rows="5"></textarea>
                    </div>
                    <div className="form-group">
                        Enter IMG URL or Add from your Computer
                        <input className="form-control" onChange={handleChange} type="text" name="imageUrl" value={newsState.imageUrl} />
                        <input type="file" ref={file} className="form-control-file" />
                    </div>
                    <input className = "btn btn-primary" type="submit" value="Add" />
                </form>
            </div>}
        </div>
        )
}

export default NewsManager;