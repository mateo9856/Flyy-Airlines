import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import FetchDatas from "../../FetchDatas";

const PutManage = (props) => {
    const [editData, setEditData] = useState("");
    const returnForms = (data) => {
        if (data === "flight") {
            FetchDatas.GetAll();//adresy api
        }

        else if (data === "airplane") {
            FetchDatas.GetAll();
        }
        else {
            FetchDatas.GetAll();
        }
        switch (data) {
            case "reservation":
                return <>
                    
                </>
            case "flight":
                return <></>
            case "airplane":
                return <></>
            default:
                return <h4>Wybierz dane!</h4>
        }
    }

    const [changedData, setChangedData] = useState("reservation");
    const [context, setContext] = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setChangedData(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="SelectChangedData">Co edytujesz?</label>
                </div>
                <select value={changedData} onChange={handleChange} className="form-control">
                    <option value="reservation">Rezerwacja</option>
                    <option value="flight">Wyloty</option>
                    <option value="airplane">Samolot</option>
                </select>
                {returnForms(changedData)}
                <input className="btn btn-primary" type="submit" value="Zmień!" />
            </form>
        </div>
    )
}

export default PutManage;