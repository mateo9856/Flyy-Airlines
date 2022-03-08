import React, { useState } from 'react';
import { MdDragHandle } from 'react-icons/md';
import FetchDatas from '../../FetchDatas';
import "../css/Header/quickSearch.css";
const QuickSearch = ({ type }) => {
    const [value, setValue] = useState({
        text1: "",
        text2: ""
    });

    const [findValue, setFindValue] = useState({
        text1: "",
        text2: ""
    });

    const handleChange = (e) => {
        const changedValue = [e.target.name];
        setValue({
            ...value,
            changedValue: e.target.value
        })
        if (changedValue.value >= 3) {
            FetchDatas.GetAll('api/Flights/Name/' + changedValue.value, setFindValue);//if doesnt work implement in fetchDatas
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //redirect to concrete summary url with parameters
        //build summary component
    }

    return (
        <div className="quickSearchPosition">
            <div className="quickReservations">
                <h6 className="text-white text-center text-uppercase">SZYBKIE WYSZUKIWANIE</h6>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="leavings">
                        <input type="text" className="quickSearchText" value={value.text1} name="text1" onChange={handleChange} placeholder="Wylot z:" />
                        </label>
                    <label htmlFor="destiantion">
                        <input type="text" className="quickSearchText" value={value.text2} name="text2" onChange={handleChange} placeholder="Wylot do:" />
                    </label>
                    <input className="btn btn-primary" disabled type="submit" value="Przejdź!" />
                    </form>
            </div>
        </div>
    )
}

export default QuickSearch;