import React, { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import FetchDatas from "../FetchDatas";

const Messages = (props) => {
    const [context, setContext] = useContext(AppContext);

    const [Messages, setMessages] = useState([]);

    useEffect(() => {
        FetchDatas.Get('api/Messages/' + context.userData.id, setMessages);
    }, [])

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Topic</th>
                        <th scope = "col">Author</th>
                    </tr>
                </thead>
                <tbody>
                    {Messages.map(res => <tr>
                        <td>{res.title}</td>
                        <td>{res.user.userName}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default Messages;